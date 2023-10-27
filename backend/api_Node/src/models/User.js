const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username:{ 
        type: String,
        required: true,
    },

    farm:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

    phoneWhatzap:{
        type: String,
        required: true,
    },

    address:{
        road:{
            type: String,
            required: true,
        },
        number:{
            type: String,
            required: true,
        },
        neighborhood:{
            type: String,
            required: true,
        },
        complement: {
            type: String,
        }

    }

    
});

module.exports = mongoose.model('User', Schema);