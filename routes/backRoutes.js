const express = require("express")
const router = express.Router()
const {obtenerNoticias, buscarNoticia, crearNoticia, borrarNoticia, actualizarNoticia, buscarNoticiasCreador} = require("../controllers/controllerBlog")
//RECOGER TODAS LAS NOTICIAS
router.get('/', obtenerNoticias)

//BUSCAR NOTICIA POR NOMBRE
router.get("/:titulo", buscarNoticia)
//BUSCAR NOTICIA POR NOMBRE
router.get("/creadapor/:creador", buscarNoticiasCreador)

//CREAR NOTICIA
router.post("/", crearNoticia)

//EDITAR NOTICIA

router.put("/:id", actualizarNoticia)

//BORRAR NOTICIA

router.delete("/:id", borrarNoticia)

//SBIR FOTOS



module.exports = router