/*
 grupos-usuarios-lineas.controller.js
 Gestión de las rutas de linea de grupos de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var gruposUsuariosLineasDb = require("../grupos-usuarios-lineas/grupos-usuarios-lineas.db_mysql");

router.get('/', function (req, res) {
    gruposUsuariosLineasDb.get(function (err, grupos) {
        if (err) return res.status(500).send(err.message);
        res.json(grupos);
    });
});

router.get('/:grupoUsuarioLineaId', function (req, res) {
    var grupoUsuarioLineaId = req.params.grupoUsuarioLineaId;
    if (!grupoUsuarioLineaId) return res.status(400).send('Debe indicar el identificador de linea de grupo');
    gruposUsuariosLineasDb.getById(grupoUsuarioLineaId, function (err, grupos) {
        if (err) return res.status(500).send(err.message);
        if (grupos.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(grupos[0]);
    });
})

router.post('/', function (req, res) {
    var grupoUsuariosLineas = req.body;
    if (!grupoUsuariosLineas) return res.status(400).send('Debe incluir un objeto de linea de grupo en el cuerpo del mensaje');
    gruposUsuariosLineasDb.post(grupoUsuariosLineas, function (err, grupo) {
        if (err) return res.status(500).send(err.message);
        res.json(grupo);
    });
});

router.put('/', function (req, res) {
    var grupoUsuariosLineas = req.body;
    if (!grupoUsuariosLineas) return res.status(400).send('Debe incluir un objeto de linea de grupo en el cuerpo del mensaje');
    gruposUsuariosLineasDb.put(grupoUsuariosLineas, function (err, grupo) {
        if (err) return res.status(500).send(err.message);
        res.json(grupo);
    });
});

router.delete('/:grupoUsuarioLineaId', function (req, res) {
    var grupoUsuarioLineaId = req.params.grupoUsuarioLineaId;
    if (!grupoUsuarioLineaId) return res.status(400).send('Debe indicar el identificador de linea de grupo');
    gruposUsuariosLineasDb.delete(grupoUsuarioLineaId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;