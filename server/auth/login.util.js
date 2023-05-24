//import mongodb connection class
const MongoDB = require('../database/mongodb.db');

//import user model
const User = require('../models/user.model');

//import bcrypt
const bcrypt = require('bcrypt');

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//import config
const config = require('../config/config.json');

//import nodemailer
const nodemailer = require('nodemailer');

//class Login

class Login {
    constructor() {
        this._db = MongoDB;
        this._userModel = User;
        this._bcrypt = bcrypt;
        this._jwt = jwt;
        this._config = config;
        this._nodemailer = nodemailer;
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this._config.email.user,
                pass: this._config.email.pass
            }
        });
    }

    async login(req, res) {
        try {
            let user = await this._userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            if (!this._bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).json({
                    message: 'Wrong password'
                });
            }
            let token = this._jwt.sign({ user: user }, this._config.secret, { expiresIn: '1h' });
            res.status(200).json({
                message: 'Login successful',
                token: token
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error
            });
        }
    }

    async forgotPassword(req, res) {
        try {
            let user = await this._userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            let token = this._jwt.sign({ user: user }, this._config.secret, { expiresIn: '1h' });
            let mailOptions = {
                from: this._config.email.user,
                to: user.email,
                subject: 'Reset password',
                text: 'Click on the link to reset your password: ' + this._config.email.url + token
            };
            this._transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Error',
                        error: error
                    });
                } else {
                    return res.status(200).json({
                        message: 'Email sent',
                        info: info
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error
            });
        }
    }

    async resetPassword(req, res) {

        try {
            let decoded = this._jwt.verify(req.body.token, this._config.secret);
            let user = await this._userModel.findOne({ email: decoded.user.email });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.password = this._bcrypt.hashSync(req.body.password, 10);
            await user.save();
            res.status(200).json({
                message: 'Password changed'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error
            });
        }
    }
}
/*

A classe Login possui três métodos assíncronos: `login()`, `forgotPassword()` e `resetPassword()`. A classe usa a conexão com o 
MongoDB criada a partir da classe `MongoDB` e o modelo de usuário criado na classe `User`. A classe também usa as bibliotecas 
`bcrypt` para criptografar senhas, `jsonwebtoken` para gerar e verificar tokens JWT, `nodemailer` para enviar emails e `config` 
para acessar as informações de configuração do aplicativo.

O método `login()` recebe um objeto `req` representando a requisição HTTP do cliente e um objeto `res` representando a resposta 
HTTP a ser enviada de volta para o cliente. O método procura um usuário com o email fornecido na coleção de usuários usando o 
método `findOne()` do modelo de usuário. Se o usuário não for encontrado, retorna um status HTTP 400 com uma mensagem de erro. Se 
o usuário for encontrado, verifica se a senha fornecida corresponde à senha armazenada criptografada usando o método `compareSync()` 
da biblioteca `bcrypt`. Se as senhas não corresponderem, retorna um status HTTP 400 com uma mensagem de erro. 
Se as senhas corresponderem, gera um token JWT usando o método `sign()` da biblioteca `jsonwebtoken`, e retorna um status HTTP 200 
com a mensagem de login bem-sucedido e o token JWT.

O método `forgotPassword()` recebe um objeto `req` representando a requisição HTTP do cliente e um objeto `res` representando a 
resposta HTTP a ser enviada de volta para o cliente. O método procura um usuário com o email fornecido na coleção de usuários 
usando o método `findOne()` do modelo de usuário. Se o usuário não for encontrado, retorna um status HTTP 400 com uma mensagem de 
erro. Se o usuário for encontrado, gera um token JWT usando o método `sign()` da biblioteca `jsonwebtoken`, e envia um email de 
recuperação de senha para o usuário usando o método `sendMail()` da biblioteca `nodemailer`. Se o envio de email for bem-sucedido, 
retorna um status HTTP 200 com uma mensagem informando que o email foi enviado. Se houver um erro ao enviar o email, retorna um 
status HTTP 500 com uma mensagem de erro.

O método `resetPassword()` recebe um objeto `req` representando a requisição HTTP do cliente e um objeto `res` representando a 
resposta HTTP a ser enviada de volta para o cliente. O método verifica o token JWT fornecido no corpo da requisição usando o 
método `verify()` da biblioteca `jsonwebtoken`. Se o token for inválido, retorna um status HTTP 400 com uma mensagem de erro. Se 
o token for válido, procura o usuário correspondente na coleção de usuários usando o método `findOne()` do modelo de usuário. Se 
o usuário não for encontrado, retorna um status HTTP 400 com uma mensagem de erro. Se o usuário for encontrado, atualiza a senha 
do usuário com a nova senha fornecida, criptografando-a usando o método `hashSync()` da biblioteca `bcrypt`, e salva o usuário 
usando o método `save()`. Retorna um status HTTP 200 com uma mensagem informando que a senha foi alterada.

*/
