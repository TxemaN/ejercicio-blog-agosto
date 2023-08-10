const { Schema, model } = require("mongoose");

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
    type: String,
    require: true,
    
    },

fecha: {
    type: Date,
    default: Date.now
}




})

module.exports = model("Blog", blogSchema)