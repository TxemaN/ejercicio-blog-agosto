const express = require("express")
const router = express.Router()
const {obtenerNoticias, crearNoticia} = require("../controllers/controllerBlog")
//RECOGER TODAS LAS PELICULAS
router.get('/', obtenerNoticias)

//CREAR PELICULA
router.post("/", crearNoticia)

module.exports = router