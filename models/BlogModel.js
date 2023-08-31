const { Schema, model } = require("mongoose");
const multer = require('multer')
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
    imagensrc: {
        type: String,

    },
    imagenalt: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    creador: {
        type: String,
        require: true

    },
    nombrecreador: {
        type: String,
        require: true

    },
    uploaded_file: {
        data: Buffer,
        contentType: String

    }



})

module.exports = model("Blog", blogSchema)