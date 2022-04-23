'use strict'
var express = require("express");
var BuscarController = require("../controller/BusquedaController");
var api = express.Router()

api.get('/verPrecioVehiculo/:vehiculoPrecio',BuscarController.verPrecioVehiculo);
api.get('/verTipoVehiculo/:vehiculoTipo', BuscarController.verTipoVehiculo);
api.get('/verTrasmisionVehiculo/:vehiculoTrasmision', BuscarController.verTrasmisionVehiculo);
api.get('/verMarcaVehiculo/:vehiculoMarca', BuscarController.verMarcaVehiculo);
api.get('/verAnoVehiculo/:vehiculoAno', BuscarController.verAñoVehiculo);
module.exports=api;