const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],

    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    phoneWhatzap:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

});

module.exports = mongoose.model('Cart', Schema);