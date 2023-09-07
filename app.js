const express = require("express")
const {dbConnect} = require("./helpers/connection")
const cors = require('cors')
const fetch = require("node-fetch")
require('dotenv').config();

const cookieParser = require('cookie-parser');



//SERVIDOR

const app=express();

//COOKIES
app.use(cookieParser());
//PUERTO
const port = process.env.port || 3000



//CONEXIÓN A BASE
dbConnect()

//CORS
app.use(cors({
    origin: "http://localhost:5000",
    credentials:true,
}))

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())

//RUTAS
app.use("/api/v1/blog", require("./routes/backRoutes"))
app.use("/api/v1/auth", require("./routes/authRoutes"));



//PARA LAS FOTOS



//ESCUCHA SERVIDOR
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)

});

