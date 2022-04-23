'use strict'
const carros = require("../models/veiculos")


function verPrecioVehiculo(req, res){
    var precioVehiculo = req.params.vehiculoPrecio;
    carros.find({Precio: {$regex:precioVehiculo}}, (err, vehiculoPrecio)=>{
        if(err) 
        return res.status(500).send({message: "Error en la peticion"})
        if(!vehiculoPrecio) 
        return res.status(404).send({message: `Error al encontrar vehículos con el precio ${req.params.vehiculoPrecio}`})
        return res.status(300).send({vehiculoPrecio})
    })
}

function verTipoVehiculo(req, res){
    var tipoVehiculo = req.params.vehiculoTipo;
    carros.find({Tipo_de_vehiculo: {$regex:tipoVehiculo}}, (err, vehiculoTipo)=>{
        if(err) 
        return res.status(500).send({message: "Error en la peticion"})
        if(!vehiculoTipo) 
        return res.status(404).send({message: `Error al encontrar vehículos con el tipo ${req.params.vehiculoTipo}`})
        return res.status(300).send({vehiculoTipo})
    })
}
function verTrasmisionVehiculo(req, res){
    var trasmisionVehiculo = req.params.vehiculoTrasmision;
    carros.find({Trasmision: {$regex:trasmisionVehiculo}}, (err, vehiculoTrasmision)=>{
        if(err) 
        return res.status(500).send({message: "Error en la peticion"})
        if(!vehiculoTrasmision) 
        return res.status(404).send({message: `Error al encontrar vehículos con la trasmisión ${req.params.vehiculoTrasmision}`})
        return res.status(300).send({vehiculoTrasmision})
    })
}
function verMarcaVehiculo(req, res){
    var marcaVehiculo = req.params.vehiculoMarca;
    carros.find({Marca: {$regex:marcaVehiculo}}, (err, vehiculoMarca)=>{
        if(err) 
        return res.status(500).send({message: "Error en la peticion"})
        if(!vehiculoMarca) 
        return res.status(404).send({message: `Error al encontrar vehículos con la marca ${req.params.vehiculoMarca}`})
        return res.status(300).send({vehiculoMarca})
    })
}
function verAñoVehiculo(req, res){
    var añoVehiculo = req.params.vehiculoAno;
    
    carros.find({anio: {$regex:añoVehiculo}}, (err, vehiculoAño)=>{        
        if(err) 
        return res.status(500).send({message: "Error en la peticion"})
        if(!vehiculoAño) 
        return res.status(404).send({message: `Error al encontrar vehículos con el año ${req.params.vehiculoAño}`})
        return res.status(300).send({vehiculoAño})
    })
}
module.exports={
    verPrecioVehiculo,
    verTipoVehiculo,
    verTrasmisionVehiculo,
    verMarcaVehiculo,
    verAñoVehiculo
    
}
