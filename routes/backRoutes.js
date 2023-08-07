const express = require("express")
const router = express.Router()
const {obtenerNoticias, crearNoticia, borrarNoticia} = require("../controllers/controllerBlog")
//RECOGER TODAS LAS PELICULAS
router.get('/', obtenerNoticias)

//CREAR PELICULA
router.post("/", crearNoticia)

//BORRAR PELICULA

router.delete("/:id", borrarNoticia)

module.exports = router