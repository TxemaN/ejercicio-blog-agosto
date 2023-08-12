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

//PARA LAS FOTOS
app.post("/foto", upload.single("myImage"), (req, res) => {
    const obj = {
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
    const newImage = new ImageModel({
      image: obj.img,
    });
    newImage.save((err) => {
      err ? console.log(err) : res.redirect("/");
    });
  });



module.exports = router