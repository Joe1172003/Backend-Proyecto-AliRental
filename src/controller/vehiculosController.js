'use strict'

var vehiculos = require('../models/veiculos');
var jwt = require('../services/jwt')
const path = require('path')
var fs = require('fs')
var multer = require('multer')



var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage})


function subirimg(req, res){
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    vehiculos.create(final_img, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log('Saved the database');
            res.contentType(final_img.contentType);
            res.send(final_img.image)
        }
    })
}

function ingresarVehiculo(req, res){
    var Vehiculos = new vehiculos()
    var params = req.body
    
      
    if(params.modelo && params.marca && params.anio && params.tarjetaDeCirculacion && params.transmision && params.precio
        && params.tipoDeVehiculo){
            Vehiculos.modelo = params.modelo;
            Vehiculos.marca = params.marca;
            Vehiculos.anio = params.anio;
            Vehiculos.tarjetaDeCirculacion = params.tarjetaDeCirculacion;
            Vehiculos.usuario = req.user.sub
            Vehiculos.transmision = params.transmision;
            Vehiculos.precio = params.precio;
            Vehiculos.tipoDeVehiculo = params.tipoDeVehiculo

            Vehiculos.save((err, vehiculoSaved)=>{
                if(err){
                    res.status(500).send({message: 'Error general'})
                }else if(vehiculoSaved){
                    res.send({message: 'Vehiculo Registrado', vehiculoSaved})
                }else{
                    res.status(416).send({message: 'No se pudo registrar el vehiculo'})
                }
            })
    }else{
        res.send({message: 'Rellene todos los datos necesarios'})
    }
}

function listarVehiculos(req, res){
    vehiculos.find((err, vehiculosFound)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(vehiculosFound){
            res.send({message: 'Vehiculos encontrados', vehiculosFound})
        }else{
            res.status(418).send({message: 'No se encontraron los usuarios'})
        }
    });
}

function eliminarVehiculos(req, res){
    var params = req.body;
    var idVehiculo = req.params.idVehiculo
    vehiculos.findByIdAndRemove(idVehiculo, (err, vehiculoDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(vehiculoDeleted){
            res.send({message: 'Vehiculo Eliminado'});
        }else{
            res.status(416).send({message: 'No se pudo eliminar el vehiculo'})
        }
    })
}

function editarVehiculo(req, res){
    var params = req.body;
    var idVehiculo = req.params.idVehiculo
    vehiculos.findByIdAndUpdate(idVehiculo, params, {new: true}, (err, vehiculoActualizado)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(vehiculoActualizado){
            res.send({message: 'Vehiculo Actualizado', vehiculoActualizado})
        }else{
            res.status(416).send({message: 'No se pudo actualizar el usuario'})
        }
    })
}

function listarVehiculos3(req, res){
    vehiculos.find((err, vehiculosFound3)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(vehiculosFound3){
            res.send({message: 'Vehiculos encontrados', vehiculosFound3})
        }else{
            res.status(418).send({message: 'No se encontraron los usuarios'})
        }
    }).limit(3);
}

function findCar(req, res){
    var idVehiculo = req.params.idV;
    vehiculos.findById({_id: idVehiculo}, (err, vFound)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(vFound){
            res.send({message: 'Vehiculo encontrado', vFound})
        }else{
            res.status(418).send({message: "No se encontro el Vehiculo"})
        }
    }).limit(3);
}

module.exports = {
    ingresarVehiculo,
    subirimg,
    editarVehiculo,
    eliminarVehiculos,
    listarVehiculos,
    listarVehiculos3,
    findCar
}