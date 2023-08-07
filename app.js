const express = require("express")
const {dbConnect} = require("./helpers/connection")
require('dotenv').config();


//SERVIDOR

const app=express();

//PUERTO
const port = process.env.port

//CONEXIÓN A BASE
dbConnect()

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())

//RUTAS
app.use("/api/v1/blog", require("./routes/backRoutes"))


//ESCUCHA SERVIDOR
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)

});
