/*
 proyectos_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var proyectosCentralDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM proyectos_central";
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
            var sql = "SELECT * FROM proyectos_central WHERE codigo = '?'";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(proyecto, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO proyectos_central SET ?";
            sql = mysql.format(sql, proyecto);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                proyecto.codigo = grupo.insertId;
                done(null, proyecto);
            });
        });
    },
    put: function(proyecto, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE proyectos_central SET ? WHERE codigo = '?'";
            sql = mysql.format(sql, [proyecto, proyecto.codigo]);
            con.query(sql, function (err, proyecto) {
                con.end();
                if (err) return done(err);
                done(null, proyecto);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM proyectos_central WHERE codigo =  '?'";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = proyectosCentralDbAPI;