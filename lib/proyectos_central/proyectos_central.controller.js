/*
 proyectos.controller.js
 Gestión de las rutas de proyectos de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var proyectosCentralDb = require("../proyectos_central/proyectos_central.db_mysql");

router.get('/', function (req, res) {
    proyectosCentralDb.get(function (err, proyectos) {
        if (err) return res.status(500).send(err.message);
        res.json(proyectos);
    });
});

router.get('/:codigo', function (req, res) {
    var codigo = req.params.codigo;
    if (!codigo) return res.status(400).send('Debe indicar el codigo de proyecto');
    proyectosCentralDb.getById(codigo, function (err, proyectos) {
        if (err) return res.status(500).send(err.message);
        if (proyectos.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(proyectos[0]);
    });
})

router.post('/', function (req, res) {
    var proyecto = req.body;
    if (!proyecto) return res.status(400).send('Debe incluir un objeto de proyecto en el cuerpo del mensaje');
    proyectosCentralDb.post(proyecto, function (err, proyecto) {
        if (err) return res.status(500).send(err.message);
        res.json(proyecto);
    });
});

router.put('/', function (req, res) {
    var proyecto = req.body;
    if (!proyecto) return res.status(400).send('Debe incluir un objeto de proyecto en el cuerpo del mensaje');
    proyectosCentralDb.put(proyecto, function (err, proyecto) {
        if (err) return res.status(500).send(err.message);
        res.json(proyecto);
    });
});

router.delete('/:codigo', function (req, res) {
    var codigo = req.params.codigo;
    if (!codigo) return res.status(400).send('Debe indicar el identificador de proyecto');
    proyectosCentralDb.delete(codigo, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;