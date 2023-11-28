const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    productName:{ 
        type: String,
        required: true,
    },
    productDescription:{
        type: String,
        required: true,
    },
    productPrice:{
        type: String,
        required: true,
    },
    productImage:{
        type: String,
    },

    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    
    
});

module.exports = mongoose.model('Products', Schema);
