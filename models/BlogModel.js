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
foto: {
    type: String,
    data: Buffer,
    contentType: String
    
    },

fecha: {
    type: Date,
    default: Date.now
}




})

module.exports = model("Blog", blogSchema)