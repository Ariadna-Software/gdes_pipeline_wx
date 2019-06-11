/*
 tiposProyecto_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var tiposProyectoDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM tipos_proyecto";
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
            var sql = "SELECT * FROM tipos_proyecto WHERE tipoProyectoId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(tipoProyecto, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO tipos_proyecto SET ?";
            sql = mysql.format(sql, tipoProyecto);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                tipoProyecto.tipoProyectoId = grupo.insertId;
                done(null, tipoProyecto);
            });
        });
    },
    put: function(tipoProyecto, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE tipos_proyecto SET ? WHERE tipoProyectoId = ?";
            sql = mysql.format(sql, [tipoProyecto, tipoProyecto.tipoProyectoId]);
            con.query(sql, function (err, tipoProyecto) {
                con.end();
                if (err) return done(err);
                done(null, tipoProyecto);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM tipos_proyecto WHERE tipoProyectoId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = tiposProyectoDbAPI;