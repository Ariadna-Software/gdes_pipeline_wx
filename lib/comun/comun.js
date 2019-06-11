// Contiene librerias comunes que sirven de apoyo
// a otras librerías

//----------------------------
// MYSQL
// ----------------------------
var mysql = require("mysql"); // librería para el acceso a bases de datos MySQL
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS
var config = require("../../configMySQL.json"); //  leer la configurción de MySQL
//

module.exports.getConnectionCallback = function (done) {
    var connection = mysql.createConnection(fnEnvConf());
    connection.connect(function (err) {
        if (err) return done(err);
        done(null, connection);
    });
}

module.exports.getConnectionCallbackTransaction = function (done) {
    var connection = mysql.createConnection(fnEnvConf());
    connection.connect(function (err) {
        if (err) return done(err);
        connection.beginTransaction(function (err) {
            if (err) return done(err);
            done(null, connection);
        })
    });
}

module.exports.closeConnectionCallback = function (connection, done) {
    connection.end(function (err) {
        if (err) return done(err);
        done();
    });
}

module.exports.closeConnection = function (connection) {
    connection.end(function (err) {
        // TODO: Tratamiento del error?
    });
}

//

module.exports.numeralSpanish = function () {
    return {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                    (b === 7 || b === 0) ? 'mo' :
                        (b === 8) ? 'vo' :
                            (b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '€'
        }
    };
}


module.exports.getMySQLConf = function () {
    return fnEnvConf();
}

var fnEnvConf = function () {
    var cfg1 = {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    };
    var cfg2 = {};
    cfg2.host = process.env.MYSQL_HOST || cfg1.host;
    cfg2.user = process.env.MYSQL_USER || cfg1.user;
    cfg2.password = process.env.MYSQL_PASSWORD || cfg1.password;
    cfg2.database = process.env.MYSQL_DATABASE || cfg1.database;
    cfg2.port = process.env.MYSQL_PORT || cfg1.port;
    return cfg2;
}

class Database {
    constructor(config) {
        if (!config) config = fnEnvConf();
        this.connection = mysql.createConnection(config);
    }
    query(sql, args, close) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (close) this.connection.end();
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports.db = Database;