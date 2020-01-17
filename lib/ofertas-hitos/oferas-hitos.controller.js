/*
 ofertaHitos.controller.js
 Gestión de las rutas de ofertaHitos de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var ofertaHitosDb = require("../ofertas-hitos/ofertas-hitos.db_mysql");

router.get('/', function (req, res) {
    ofertaHitosDb.get(function (err, ofertaHitos) {
        if (err) return res.status(500).send(err.message);
        res.json(ofertaHitos);
    });
});

router.get('/:ofertaHitoId', function (req, res) {
    var ofertaHitoId = req.params.ofertaHitoId;
    if (!ofertaHitoId) return res.status(400).send('Debe indicar el identificador de ofertaHito');
    ofertaHitosDb.getById(ofertaHitoId, function (err, ofertaHitos) {
        if (err) return res.status(500).send(err.message);
        if (ofertaHitos.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(ofertaHitos[0]);
    });
})

router.post('/', function (req, res) {
    var ofertaHito = req.body;
    if (!ofertaHito) return res.status(400).send('Debe incluir un objeto de ofertaHito en el cuerpo del mensaje');
    ofertaHitosDb.post(ofertaHito, function (err, ofertaHito) {
        if (err) return res.status(500).send(err.message);
        res.json(ofertaHito);
    });
});

router.put('/', function (req, res) {
    var ofertaHito = req.body;
    if (!ofertaHito) return res.status(400).send('Debe incluir un objeto de ofertaHito en el cuerpo del mensaje');
    ofertaHitosDb.put(ofertaHito, function (err, ofertaHito) {
        if (err) return res.status(500).send(err.message);
        res.json(ofertaHito);
    });
});

router.delete('/:ofertaHitoId', function (req, res) {
    var ofertaHitoId = req.params.ofertaHitoId;
    if (!ofertaHitoId) return res.status(400).send('Debe indicar el identificador de ofertaHito');
    ofertaHitosDb.delete(ofertaHitoId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;