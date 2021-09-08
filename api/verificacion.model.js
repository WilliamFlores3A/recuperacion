const { model, Schema } = require('mongoose');

const verificacionSchema = new Schema({
    curso: {
        type: String,
        required: true
    },
    Aprobados: {
        type: Number,
        required: true
    },
    Recuperacion: {
        type: Number,
        required: true
    },
    Reprobado: {
        type: Number,
        required: true
    },
    Tutorias: {
        type: Number,
        required: true
    }
});
module.exports = model('verificacion', verificacionSchema);