const express = require("express")
const router = express.Router()
const {obtenerNoticias, buscarNoticia, crearNoticia, borrarNoticia, actualizarNoticia} = require("../controllers/controllerBlog")
//RECOGER TODAS LAS NOTICIAS
router.get('/', obtenerNoticias)

//BUSCAR NOTICIA POR NOMBRE
router.get("/:titulo", buscarNoticia)

//CREAR NOTICIA
router.post("/", crearNoticia)

//EDITAR NOTICIA

router.put("/:id", actualizarNoticia)

//BORRAR NOTICIA

router.delete("/:id", borrarNoticia)

module.exports = router