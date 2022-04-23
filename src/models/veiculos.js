'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VeiculosSchema=Schema({
    modelo:String,
    marca:String,
    anio:String,
    tarjetaDeCirculacion:String,
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    transmision:String,
    precio:String,
    tipoDeVehiculo:String,
    image: {
        data: Buffer,
        contentType: String
    }
})
module.exports=mongoose.model('Veiculo',VeiculosSchema)