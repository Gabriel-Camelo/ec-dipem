const mongoose = require('mongoose');

// Defina o esquema do usuário
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Crie o modelo de usuário
const User = mongoose.model('User', userSchema);

class MongoDB {
  constructor() {
    this._connect();
  }

  _connect() {
    const uri = 'mongodb://localhost:27017/mydatabase'; // substitua pelo seu URI de conexão MongoDB
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Conexão com o MongoDB estabelecida.');
      })
      .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
      });
  }

  register(user) {
    const newUser = new User(user);

    return newUser.save()
      .then((result) => {
        console.log('Usuário registrado com sucesso:', result);
        return result;
      })
      .catch((error) => {
        console.error('Erro ao registrar usuário:', error);
        throw error;
      });
  }

  // Implemente os outros métodos (delete, getUserByEmail, getUserByName) aqui
}

module.exports = new MongoDB();

/*

A classe MongoDB possui um método construtor que chama o método privado `_connect()`, que é responsável por estabelecer a conexão 
com o banco de dados. 

O método `_connect()` utiliza o método `mongoose.connect()` para estabelecer a conexão com o banco de dados MongoDB, passando como 
argumento a URL do banco de dados obtida do arquivo de configuração `config.json`. 

O método `mongoose.connect()` retorna uma Promise, que é tratada com os métodos `then()` e `catch()`. Se a conexão com o banco de 
dados for estabelecida com sucesso, o método `then()` é executado e uma mensagem é exibida no console. Caso contrário, o método 
`catch()` é executado e uma mensagem de erro é exibida no console.

Por fim, a classe exporta uma instância da classe MongoDB usando `module.exports = new MongoDB();`, o que significa que sempre que 
um módulo solicita essa classe, será fornecida a mesma instância já criada.

*/