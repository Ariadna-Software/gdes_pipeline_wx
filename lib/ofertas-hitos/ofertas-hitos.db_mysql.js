/*
 ofertaHitos_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");
const { connect } = require("./ofertas-hitos.controller");

var ofertaHitosDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM ofertas_hitos ORDER BY fecha";
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
            var sql = "SELECT * FROM ofertas_hitos WHERE ofertaId = ? ORDER BY fecha";
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
            var sql = `SELECT
            o.ofertaId, o.fechaInicioContrato, o.fechaFinContrato, o.importePresupuesto, SUM(oh.importe) AS importe 
            FROM ofertas AS o
            LEFT JOIN ofertas_hitos AS oh ON oh.ofertaId = o.ofertaId
            WHERE o.ofertaId = ${ofertaHito.ofertaId}
            GROUP BY 1`;
            con.query(sql, function (err, resultado) {
                if (err){
                    con.end();
                    return done(err);  
                } 
                var reg = resultado[0];
                if (new Date(ofertaHito.fecha) < reg.fechaInicioContrato || new Date(ofertaHito.fecha) > reg.fechaFinContrato) {
                    var error = new Error('La fecha del hito cae fuera de las fechas del contrato');
                    con.end();
                    return done(error);
                }
                if (ofertaHito.importe + reg.importe > reg.importePresupuesto) {
                    var error = new Error('La suma de importes de los hitos supera a la del contrato');
                    con.end();
                    return done(error);
                }
                sql = "INSERT INTO ofertas_hitos SET ?";
                sql = mysql.format(sql, ofertaHito);
                con.query(sql, function (err, grupo) {
                    con.end();
                    if (err) return done(err);
                    ofertaHito.ofertaHitoId = grupo.insertId;
                    done(null, ofertaHito);
                });
            });
        });
    },
    put: function(ofertaHito, done){
        comun.getConnectionCallback(function (err, con) {
            var sql = `SELECT
            o.ofertaId, o.fechaInicioContrato, o.fechaFinContrato, o.importePresupuesto, SUM(oh.importe) AS importe 
            FROM ofertas AS o
            LEFT JOIN ofertas_hitos AS oh ON oh.ofertaId = o.ofertaId
            WHERE o.ofertaId = ${ofertaHito.ofertaId} AND oh.ofertaHitoId <> ${ofertaHito.ofertaHitoId}
            GROUP BY 1`;
            con.query(sql, function (err, resultado) {
                if (err){
                    con.end();
                    return done(err);  
                } 
                if (resultado.length === 0) {
                    sql = `SELECT
                    o.ofertaId, o.fechaInicioContrato, o.fechaFinContrato, o.importePresupuesto, SUM(oh.importe) AS importe 
                    FROM ofertas AS o
                    LEFT JOIN ofertas_hitos AS oh ON oh.ofertaId = o.ofertaId
                    WHERE o.ofertaId = ${ofertaHito.ofertaId}
                    GROUP BY 1`;
                    con.query(sql, function (err, resultado){
                        if (err){
                            con.end();
                            return done(err);  
                        } 
                        var reg = resultado[0];
                        if (new Date(ofertaHito.fecha) < reg.fechaInicioContrato || new Date(ofertaHito.fecha) > reg.fechaFinContrato) {
                            var error = new Error('La fecha del hito cae fuera de las fechas del contrato');
                            con.end();
                            return done(error);
                        }
                        if (ofertaHito.importe > reg.importePresupuesto) {
                            var error = new Error('La suma de importes de los hitos supera a la del contrato');
                            con.end();
                            return done(error);
                        }
                        sql = "UPDATE ofertas_hitos SET ? WHERE ofertaHitoId = ?";
                        sql = mysql.format(sql, [ofertaHito, ofertaHito.ofertaHitoId]);
                        con.query(sql, function (err, ofertaHito) {
                            con.end();
                            if (err) return done(err);
                            done(null, ofertaHito);
                        });
                    })
                } else {
                    var reg = resultado[0];
                    if (new Date(ofertaHito.fecha) < reg.fechaInicioContrato || new Date(ofertaHito.fecha) > reg.fechaFinContrato) {
                        var error = new Error('La fecha del hito cae fuera de las fechas del contrato');
                        con.end();
                        return done(error);
                    }
                    if (ofertaHito.importe + reg.importe > reg.importePresupuesto) {
                        var error = new Error('La suma de importes de los hitos supera a la del contrato');
                        con.end();
                        return done(error);
                    }
                    sql = "UPDATE ofertas_hitos SET ? WHERE ofertaHitoId = ?";
                    sql = mysql.format(sql, [ofertaHito, ofertaHito.ofertaHitoId]);
                    con.query(sql, function (err, ofertaHito) {
                        con.end();
                        if (err) return done(err);
                        done(null, ofertaHito);
                    });
                }
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
    },
}

module.exports = ofertaHitosDbAPI;