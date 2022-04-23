'user strict'
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ReservaSchema= Schema({
    vehiculo :{type:Schema.Types.ObjectId,ref:'Veiculo'},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    dpi:{type:Schema.Types.String,ref:'Usuario'},
    Fecha_Alquiler:String,
    Fecha_retorno:String,
    Monto_Apagar:String
})
module.exports=mongoose.model('reserva',ReservaSchema);