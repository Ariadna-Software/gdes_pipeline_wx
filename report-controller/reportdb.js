var express = require('express');
var router = express.Router();

var MySQLAdapter = require('./mySqlAdapter');
var FirebirdAdapter = require('./FirebirdAdapter');
var MSSQLAdapter = require('./msSqlAdapter');
var PostgreSQLAdapter = require('./PostgreSQLAdapter');
var OracleAdapter = require('./OracleAdapter');

var connectionStringBuilder;
var response;


router.post('/', function (req, res) {
    console.log("POST :" ,req.body);
    response = res;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Cache-Control", "no-cache");
    var data = "";
    req.on('data', function (buffer) {
        data += buffer;
    });

    req.on('end', function () {
        // console.log("DATA:", data);
        // console.log("dt2", new Buffer(data, 'base64').toString('ascii'));
        command = JSON.parse(data.toString());

        if (command.database == "MySQL") MySQLAdapter.process(command, onProcess);
        if (command.database == "Firebird") FirebirdAdapter.process(command, onProcess);
        if (command.database == "MS SQL") MSSQLAdapter.process(command, onProcess);
        if (command.database == "PostgreSQL") PostgreSQLAdapter.process(command, onProcess);
        if (command.database == "Oracle") OracleAdapter.process(command, onProcess);
    });
});


var onProcess = function (result){
    response.end(JSON.stringify(result));
}

module.exports = router;
