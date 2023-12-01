const express = require('express');
const path = require('path'); // Importe o módulo 'path'
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');

require("dotenv").config();


const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true , useBigInt64:true}, console.log('Conectado ao MongoDB!'));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());    
app.use(routes);

const port = process.env.PORT  ; // Use a porta definida no arquivo .env ou 8000 como padrã]


app.listen(port, () => {
    console.log('servidor Rodando na porta 8000');
});









