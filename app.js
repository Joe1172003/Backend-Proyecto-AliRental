'use strict'
const express= require("express")
const app = express();
const bodyParser = require("body-parser")

var usuario_routes = require("./src/routes/rutasUsuario")
var vehiculos_routes = require('./src/routes/rutasVeiculos')
var reservaciones_routes = require('./src/routes/rutasReservaciones')
var buscar_routes = require('./src/routes/rutasBuscar')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requested-Whith,Content-Type,Accept,Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE')
    res.header('Allow','GET,POST, OPTIONS, PUT ,DELETE')
    next();
})
app.use('/api',usuario_routes);
app.use('/vehiculos', vehiculos_routes);
app.use('/reserva',reservaciones_routes);
app.use('/Buscar',buscar_routes)
module.exports=app;


