const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    farm: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    phoneWhatzap: {
        type: String,
        required: true,
    },

    address: {

        city: {
            type: String,
            required: true,
        },
        road: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        neighborhood: {
            type: String,
            required: true,
        },
        complement: {
            type: String,
        }

    }


});

Schema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password') || user.isNew){
        const encryptedPassword = await bcrypt.hash(user.password, 10)
        user.password = encryptedPassword
    }
    user.alterado_em = new Date();
    next()
})

const User = mongoose.model('User', Schema)

module.exports = User;