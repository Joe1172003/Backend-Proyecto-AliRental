'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema=Schema({
    usuario:String,
    password:String,
    nombre:String,
    apellido:String,
    telefono:String,
    dpi:String,
    correo:String,
    fechaDeNacimiento:String,
    sexo:String,
    tipoDeLicencia:String
})
module.exports=mongoose.model('Usuario',UsuarioSchema)