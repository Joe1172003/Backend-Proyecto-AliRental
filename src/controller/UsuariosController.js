'use strict'
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var Usuarios = require("../models/Usuario");


function ingresarUsuario(req,res){
    var User = new Usuarios();
    var params=req.body;
    if(params.usuario&& params.password&& params.nombre&& params.apellido&&params.telefono&&params.dpi&&params.correo&&params.fechaDeNacimiento){
        User.usuario=params.usuario;
        User.nombre=params.nombre;
        User.apellido=params.apellido;
        User.telefono=params.telefono;
        User.dpi=params.dpi;
        User.correo=params.correo;
        User.fechaDeNacimiento=params.fechaDeNacimiento;
        User.sexo = params.sexo
        User.tipoDeLicencia=params.tipoDeLicencia;
    
        Usuarios.find(
            {$or:[
                {usuario:User.usuario},
                {correo: User.correo}
            ]}).exec((err,usuarios)=>{
            if(err)return res.status(500).send({message:'Error en la petición'})
            if(usuarios&&usuarios.length>=1){
                return res.status(500).send({message:'El usuario ya existe'})            
            }else{
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    User.password = hash;

                    User.save((err,UserGuardado)=>{
                        if(err) return res.status(500).send({message:'Error al guardar el ususario'})
                        if(UserGuardado){
                        return res.status(200).send({user:UserGuardado})
                        }else{
                            return res.status(404).send({message:'No se ha guardado el usuario'})
                        }                    
                    })
                })
            }
    })
}else{
    return res.status(200).send({ message:'Rellene todos los datos necesarios'})
}
    
}
function login(req,res){
    var params = req.body;

    Usuarios.findOne({correo: params.email}, (err,user)=>{
        if(err)return res.status(500).send({message:'error en la peticion'})
        if(user){
            bcrypt.compare(params.password, user.password, (err,check)=>{ 
            
            if(check){
                if(params.gettoken = true){
                    return res.status(200).send({
                        token: jwt.CrearToken(user), user
                    })
                }else{
                    user.password = undefined;
                    return res.status(200).send({ user })
                }
            }else{
                return res.status(404).send({message: 'El usuario no se ha podido identificar'})
            }
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido logear'})
        }
    }
    )
}
function editarUsuario(req, res){
    var params = req.body
    //BORRAR LA PROPIEDAD DE PASSWORD PARA NO SER EDITADA.
    delete params.password


    Usuarios.findByIdAndUpdate(req.user.sub, params, { new: true }, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!usuarioActualizado) return res.status(404).send({ message: 'No se ha podido actualizar los datos del usuario' })

        return res.status(200).send({ user: usuarioActualizado })
    })
}

function listarUsuarios(req, res){
    Usuarios.find((err, usersFound)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(usersFound){
            res.send({message: 'Usuarios encontrados', usersFound})
        }else{
            res.status(418).send({message: 'No se encontraron Usuarios'})
        }
    })
}

function deleteUsuario(req, res){
    var params = req.body;

    Usuarios.findByIdAndRemove(req.user.sub, (err, userDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general'})
        }else if(userDeleted){
            res.send({message: 'Usuario Eliminado'})
        }else{
            res.status(418).send({message: 'No se encontro al usuario'})
        }
    })
}

module.exports={
    ingresarUsuario,
    login,
    editarUsuario,
    listarUsuarios,
    deleteUsuario
}