'use strict'
var jwt = require("jwt-simple"); 
var moment = require("moment");
var secret = 'Alquiler_carros'

exports.CrearToken = function(user){
    var payload = {
        sub: user._id,
        usuario:user.usuario,
        password: user.password,
        nombre: user.nombre,
        apellido:user.apellido,
        telefono:user.telefono,
        dpi:user.dpi,
        correo:user.correo,
        fechaDeNacimiento:user.fechaDeNacimiento,
        sexo:user.sexo,
        tipoDeLicencia:user.tipoDeLicencia,
        iat: moment().unix(),
        export:moment().day(30,'days').unix(),  
      }
      return jwt.encode(payload,secret)
}