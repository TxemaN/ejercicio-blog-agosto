const { Schema, model } = require("mongoose");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const blogSchema = new Schema({
    titulo: {
        type: String,
        require: true,

    },
    noticia: {
        type: String,
        require: true,

    },
    imagen: {
        type: Buffer,
        data: String

        


    },

    fecha: {
        type: Date,
        default: Date.now
    }




})

module.exports = model("Blog", blogSchema)