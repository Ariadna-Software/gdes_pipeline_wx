﻿/*
 areas.js
 Funciones propias de la página Areas.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var areaId = 0;
var vm;

var apiPaginaAreasDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaAreasDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#areas').attr('class', 'active');
        $('#area-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaAreasDetalle.aceptar);
        $('#btnSalir').click(apiPaginaAreasDetalle.salir);

        $('#cmbUnidadNegocio').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaAreasDetalle.cargarUnidadNegocio();
        
        areaId = apiComunGeneral.gup("id");
        if (areaId == 0){
            vm.areaId(0);
        }else{
            apiPaginaAreasDetalle.cargarArea(areaId);
        }
    },
    cargarArea: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/areas/" + id, null, function(err, data){
            if (err) return;
            apiPaginaAreasDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.areaId(data.areaId);
        vm.nombre(data.nombre);
        vm.nombreEN(data.nombreEN);
        vm.nombreFR(data.nombreFR);
        vm.cod(data.cod);
        apiPaginaAreasDetalle.cargarUnidadNegocio(data.unidadNegocioId);
    },
    datosPagina: function () {
        var self = this;
        self.areaId = ko.observable();
        self.nombre = ko.observable();
        self.nombreEN = ko.observable();
        self.nombreFR = ko.observable();
        self.optionsUnidadNegocio = ko.observableArray([]);
        self.selectedUnidadNegocio = ko.observableArray([]);
        self.sUnidadNegocio = ko.observable();
        self.cod = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaAreasDetalle.datosOk()) return;
        var data = {
            areaId: vm.areaId(),
            nombre: vm.nombre(),
            nombreEN: vm.nombreEN(),
            nombreFR: vm.nombreFR(),
            unidadNegocioId: vm.sUnidadNegocio(),
            cod: vm.cod()
        };
        var verb = "PUT";
        if (vm.areaId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/areas", data, function(err, data){
            if (err) return;
            apiPaginaAreasDetalle.salir();
        });
    },
    datosOk: function(){
        $('#area-form').validate({
            rules: {
                txtNombre: { required: true },
                txtCod: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#area-form').valid();
    },
    salir: function () {
        window.open(sprintf('AreasGeneral.html'), '_self');
    },
    cargarUnidadNegocio: function (id) {
        var url = myconfig.apiUrl + "/api/unidades-negocio"
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/unidades-negocio/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ unidadNegocioId: 0, nombre: " " }].concat(data);
            vm.optionsUnidadNegocio(options);
            $("#cmbUnidadNegocio").val([id]).trigger('change');
        });
    },
}


