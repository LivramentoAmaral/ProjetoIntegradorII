const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require("dotenv").config();
const routes = require('./routes/index');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, console.log('Conectado ao MongoDB!'));

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(5000, () => {
    console.log('servidor Rodando na porta 8000');
});




