const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: tr
    },
    sreet: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true
    },
    country: {
        type: Number,
        required: true
    },
})

userSchema.virtual('id'.length(function () {
    return this._id
}))

userSchema.set('toJSON', {
    virtuals: true
})

exports.User = mongoose.model('User', userSchema)
