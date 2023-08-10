const express = require("express")
const {dbConnect} = require("./helpers/connection")
const cors = require ('cors')
require('dotenv').config();

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

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



  app.get("/", (req, res) => {
    ImageModel.find({}, (err, images) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        res.render("index", { images: images });
      }
    });
  });


//ESCUCHA SERVIDOR
app.listen(port, ()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)

});

