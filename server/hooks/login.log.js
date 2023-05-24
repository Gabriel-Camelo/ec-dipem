//log function for login tentatives success and failure

//import database class
const User = require('../models/user.model');
const PSQL = require('../database/postgresql.db');

const PostgreSQL = new PSQL('log');

const log = (req, res, next) => {
    req.status == 'success'? 
    PostgreSQL.query('INSERT INTO log (user, status, date, ip) VALUES ($1, $2, $3, $4)', [User.findOne(), req.status, new Date(), req.ip])
    : 
    console.log('Login failed');

    next();
};