'use strict'
const mongoose=require("mongoose");
var app = require("./app");
var port = 3800;
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Atlas")).catch((error) => console.error(error));

app.listen(port, ()=>{
    console.log('Servidor corriendo con express', port);
});



/* mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AlquilerCarros',{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log('Se encuentra conectado a la base de datos');
    

    app.set('port',process.env.PORT || 3000)
    app.listen(app.get('port'),()=>{
        console.log(`El servidor esta corriendo en el puerto: ${app.get('port')}`);
    })
}).catch(err=> console.log(err)) */