//postgresql master class

const { Pool } = require('pg');
const config = require('../config/config.json');

class PostgreSQL {
    constructor(db) {
        this._connect(db);
    }

    _connect(db) {
        db == 'log'? 
            this._pool = new Pool({
                user: config.database.PostgreSQL.user,
                host: config.database.PostgreSQL.host,
                database: config.database.PostgreSQL.database.log,
                password: config.database.PostgreSQL.password,
                port: config.database.PostgreSQL.port
            })
            :
            this._pool = new Pool({
                user: config.database.PostgreSQL.user,
                host: config.database.PostgreSQL.host,
                database: config.database.PostgreSQL.database.main,
                password: config.database.PostgreSQL.password,
                port: config.database.PostgreSQL.port
            });
        this._pool.connect()
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            });
    }

    query(query, params) {
        return this._pool.query(query, params);
    }
}

module.exports = PostgreSQL;