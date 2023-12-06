const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

Schema.pre('save', async function (next){
    const usercliente = this;
    if(usercliente.isModified('password') || usercliente.isNew){
        const encryptedPassword = await bcrypt.hash(usercliente.password, 10)
        usercliente.password = encryptedPassword
    }
    usercliente.alterado_em = new Date();
    next()
})

const User = mongoose.model('UserCliente', Schema)

module.exports = User;