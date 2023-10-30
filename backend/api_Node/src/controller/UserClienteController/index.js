const UserCliente = require('../../models/UserCliente');

const UserClienteController ={
    async createCliente(req,res){
        const {nome,email,senha} = req.body;
        const cliente = await UserCliente.create({nome,email,senha});
        return res.json(cliente);
    }
}


module.exports = UserClienteController;