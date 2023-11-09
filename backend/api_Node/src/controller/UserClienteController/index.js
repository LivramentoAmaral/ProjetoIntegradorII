const UserCliente = require('../../models/UserCliente');

const UserClienteController ={
    
    async createUserClient(req,res){
        
        const bodyData = req.body;

        try {

            const newUserClient = await UserCliente.create(bodyData);
            return res.status(201).json(newUserClient);
            
            
        } catch (error) {
           return res.status(400).json(error)
        }

    },

    async getUsers(req,res){
        try {
            const users = await UserCliente.find();
            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(400).json(error)
        }
    },

    async getUserById(req,res){
        const {user_id} = req.params;
        try {
            const user = await UserCliente.findById(user_id);
            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}


module.exports = UserClienteController;