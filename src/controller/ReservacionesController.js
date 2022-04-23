'use strict'
const reserva= require("../models/Reservaciones");
const carros = require ("../models/veiculos");
const moment = require("moment");
const PDFDocument = require("../../pdfkit-tables"); 
const { ok } = require("assert");
const doc = new PDFDocument({bufferPage:true});
moment.suppressDeprecationWarnings = true;
moment.locale('es');



function ingresarReservacion (req , res){
   var Rese = new reserva();
   var idCarro = req.params.idCarro;
   var params= req.body;
        
    if(params.Fecha_retorno){
        var fechahoy= moment(params.Fecha_Alquiler)
        var fechaRetor=moment(params.Fecha_retorno)
        var diferenciaDeDias = fechaRetor.diff(fechahoy,'days', false)
       
        Rese.vehiculo= idCarro
        Rese.usuario = req.user.sub
        Rese.dpi=req.user.dpi
        Rese.Fecha_Alquiler=fechahoy
        Rese.Fecha_retorno=params.Fecha_retorno                
                
        
        carros.findById(idCarro,(err,Carro)=>{
            if(err) return res.status(500).send({Message:'Error en al petición del carro'})
            if(!Carro) return res.status(404).send({Message:'Error en la petición del Carro'})
            if(Carro){
                
                var resultado= diferenciaDeDias*Carro.precio
                Rese.Monto_Apagar=resultado
                Rese.save((err,reservacionGuardad)=>{
                    if(err)return res.status(500).send({Message:'Error al guardar la reservación'})
                    if(reservacionGuardad){
                        console.log(reservacionGuardad._id)
                        return res.status(200).send({Reservacion:reservacionGuardad})
                    }else{
                        return res.status(404).send({message:'No se ha guardado la reservación'})
                    }
                })
            }
        })
    }
}

function CrearPDF (req, res){
   
    var idRecerba = req.params.idReserva;

    reserva.findById(idRecerba,(err,Imprimir)=>{   
        if(Imprimir){
        const doc = new PDFDocument({bufferPage:true});            
        //doc.pipe(fs.createWriteStream(`uploads/PDF/Reservación${Date.now()}.pdf`));
        const filename = `Reporte${Date.now()}.pdf`; //nombre de nuestro documento
        const stream =res.writeHead(200,{   //direccion de la dercarga del docuemento
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        })
        doc.on('data', (data)=>{
            stream.write(data)
        });
        doc.on('end',()=>{
            stream.end();
        })
        
        doc
        .image(`${__dirname}\\logo.png`, 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(30)
        .text("Ali Rental Cars", 110, 57) 
        .fontSize(15)
        .text("Reservacion de vehiculo", 110, 80, { align: "left" })     
        .fontSize(10)
        .text("Tel: 2436-2506", 110, 95, { align: "left" })          
        .moveDown();
        const table = {
            headers: ["Vehiculo", "Usuario", "dpi", "Fecha de Alquiler", "Fecha de retorno", "Monto de Apagar",],
            rows: [
                [Imprimir.vehiculo, Imprimir.usuario,Imprimir.dpi,Imprimir.Fecha_Alquiler,Imprimir.Fecha_retorno,Imprimir.Monto_Apagar]
            ]
        }; 

        doc.moveDown().table(table, 10, 125, { width: 590 });
        doc.end()   
        }else if(!Imprimir){
            return res.status(404).send({message:'No se ha podido generar PDF'})
        }                          
          

    })  
 }

function buscarReservacion (req, res){
    var idReserva = req.params.idR
    reserva.findById(idReserva, (err, rFound)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(rFound){
            res.send({reserva: rFound})
        }else{
            res.status(418).send({message: "Error pendejo"})
        }
    })
}


module.exports={
    ingresarReservacion,
    CrearPDF,
    buscarReservacion
    
}
