'use strict'
var express = require("express");
var reservaciónController = require("../controller/ReservacionesController");
var md_auth = require('../middleware/authenticated')
var api = express.Router()

api.post('/reservaciones/:idCarro',md_auth.ensureAuth,reservaciónController.ingresarReservacion);
api.get('/CrearPDF/:idReserva' ,reservaciónController.CrearPDF);
api.get('/listReservacion', md_auth.ensureAuth, reservaciónController.buscarReservacion)
module.exports=api;