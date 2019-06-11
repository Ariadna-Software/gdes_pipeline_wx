/*
 ubicaciones_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var ubicacionesDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM ubicaciones";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM ubicaciones WHERE ubicacionId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(ubicacion, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO ubicaciones SET ?";
            sql = mysql.format(sql, ubicacion);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                ubicacion.ubicacionId = grupo.insertId;
                done(null, ubicacion);
            });
        });
    },
    put: function(ubicacion, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE ubicaciones SET ? WHERE ubicacionId = ?";
            sql = mysql.format(sql, [ubicacion, ubicacion.ubicacionId]);
            con.query(sql, function (err, ubicacion) {
                con.end();
                if (err) return done(err);
                done(null, ubicacion);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM ubicaciones WHERE ubicacionId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = ubicacionesDbAPI;