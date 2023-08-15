const { Schema, model } = require('mongoose');

const editorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'editor'
    },
    date: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = model('Editor', editorSchema)

