/*
 grupos-usuarios-lineas_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var gruposUsuariosLineasDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM grupos_usuarios_lineas";
            con.query(sql, function (err, grupos) {
                con.end(function (err2) {
                    if (err) return done(err);
                    done(null, grupos);
                });
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM grupos_usuarios_lineas WHERE grupoUsuarioLineaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getByGrupoId: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM grupos_usuarios_lineas WHERE grupoUsuarioId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },    
    post: function (grupoUsuariosLineas, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO grupos_usuarios_lineas SET ?";
            sql = mysql.format(sql, grupoUsuariosLineas);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                grupoUsuariosLineas.grupoUsuarioLineaId = grupo.insertId;
                done(null, grupoUsuariosLineas);
            });
        });
    },
    put: function (grupoUsuariosLineas, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE grupos_usuarios_lineas SET ? WHERE grupoUsuarioLineaId = ?";
            sql = mysql.format(sql, [grupoUsuariosLineas, grupoUsuariosLineas.grupoUsuarioLineaId]);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, grupoUsuariosLineas);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM grupos_usuarios_lineas WHERE grupoUsuarioLineaId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = gruposUsuariosLineasDbAPI;