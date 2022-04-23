'use strict'

var express = require('express');
var vehiculosController = require('../controller/vehiculosController');
var md_auth = require('../middleware/authenticated')
var api = express.Router();

api.post('/addCar', md_auth.ensureAuth,vehiculosController.ingresarVehiculo);
api.get('/listCars', md_auth.ensureAuth, vehiculosController.listarVehiculos);
api.get('/listCars3', vehiculosController.listarVehiculos3)
api.delete('/deleteCar/:idVehiculo', md_auth.ensureAuth, vehiculosController.eliminarVehiculos);
api.put('/updateCar/:idVehiculo', md_auth.ensureAuth, vehiculosController.editarVehiculo);
api.get('/findOneCar/:idV', md_auth.ensureAuth, vehiculosController.findCar)


module.exports = api;