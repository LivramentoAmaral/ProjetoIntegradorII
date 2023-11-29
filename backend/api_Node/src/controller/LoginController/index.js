const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const UserCliente = require('../../models/UserCliente');
const bcrypt = require('bcryptjs');

const SessionController = {

    async createSession(req, res) {
        const { email, password } = req.body;
       
            const user = await UserCliente.findOne({ email });
            const usercliente = await User.findOne({ email });
            // Usuário encontrado, retornar os dados do usuário
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    return res.status(200).json({ accessToken });
                } else {
                    return res.status(401).json({ error: "Senha incorreta" });
                }
            }else if(usercliente){
                if (await bcrypt.compare(password, usercliente.password)) {
                    const accessToken = jwt.sign({ id: usercliente.id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    return res.status(200).json({ accessToken });
                } else {
                    return res.status(401).json({ error: "Senha incorreta" });
                }
            }else{
                return res.status(401).json({ error: "Usuário não encontrado" });
            }
            // return res.status(201).json(usercliente||user);
        
    }
};

module.exports = SessionController;
