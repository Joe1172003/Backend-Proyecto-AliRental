'use strict'
var express = require("express");
var UserController = require("../controller/UsuariosController")
var md_auth = require('../middleware/authenticated')
var api = express.Router()

api.post('/registerUser',UserController.ingresarUsuario);
api.post('/login',UserController.login);
api.put('/updateUser',md_auth.ensureAuth,UserController.editarUsuario);
api.get('/listUsers', md_auth.ensureAuth,UserController.listarUsuarios);
api.delete('/deleteUsuario', md_auth.ensureAuth, UserController.deleteUsuario)


module.exports=api;