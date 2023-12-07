const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const UserCliente = require('../../models/UserCliente');
const bcrypt = require('bcryptjs');

const SessionController = {
    async createSession(req, res) {
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            let usercliente = await UserCliente.findOne({ email });

            let userType = ''; // Variável para armazenar o tipo de usuário encontrado

            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    userType = 'user'; // Define o tipo de usuário como 'cliente'
                    const accessToken = jwt.sign({ id: user._id, userType, username:usercliente.username }, process.env.JWT_SECRET, {
                        expiresIn: '1d',
                    });
                    return res.status(200).json({ accessToken });
                } else {
                    return res.status(401).json({ error: 'Senha incorreta' });
                }
            } else if (usercliente) {
                if (await bcrypt.compare(password, usercliente.password)) {
                    userType = 'cliente'; // Define o tipo de usuário como 'user'
                    const accessToken = jwt.sign({ id: usercliente._id, userType, username: usercliente.username }, process.env.JWT_SECRET, {
                        expiresIn: '1d',
                    });
                    return res.status(200).json({ accessToken });
                } else {
                    return res.status(401).json({ error: 'Senha incorreta' });
                }
            } else {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error("Erro ao criar sessão:", error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};

module.exports = SessionController;
