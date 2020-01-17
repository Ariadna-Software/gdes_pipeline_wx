/*
 ofertaHitos_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var ofertaHitosDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM ofertas_hitos";
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
            var sql = "SELECT * FROM ofertas_hitos WHERE ofertaHitoId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getByOfertaId: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM ofertas_hitos WHERE ofertaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },    
    post: function(ofertaHito, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO ofertas_hitos SET ?";
            sql = mysql.format(sql, ofertaHito);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                ofertaHito.ofertaHitoId = grupo.insertId;
                done(null, ofertaHito);
            });
        });
    },
    put: function(ofertaHito, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE ofertas_hitos SET ? WHERE ofertaHitoId = ?";
            sql = mysql.format(sql, [ofertaHito, ofertaHito.ofertaHitoId]);
            con.query(sql, function (err, ofertaHito) {
                con.end();
                if (err) return done(err);
                done(null, ofertaHito);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM ofertas_hitos WHERE ofertaHitoId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = ofertaHitosDbAPI;