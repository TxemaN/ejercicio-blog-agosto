const express = require("express")
const {dbConnect} = require("./helpers/connection")
const cors = require ('cors')
require('dotenv').config();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//SERVIDOR

const app=express();

//PUERTO
const port = process.env.port || 3000



//CONEXIÓN A BASE
dbConnect()

//CORS
app.use(cors())

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())

//RUTAS
app.use("/api/v1/blog", require("./routes/backRoutes"))


//PARA LAS FOTOS



//ESCUCHA SERVIDOR
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)

});

