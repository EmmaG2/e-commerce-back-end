const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    realName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    numExterior: {
        type: String,
        required: true
    },
    numeInterior: {
        type: String,
        required: false
    },
    calle: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

exports.User = mongoose.model('User', userSchema)
