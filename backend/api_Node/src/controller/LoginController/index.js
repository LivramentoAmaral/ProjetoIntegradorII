const User = require('../../models/User');

const SessionController = {
    
    async createSession(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username, password });

            if (user) {
                // Usuário encontrado, retornar os dados do usuário
                return res.status(201).json(user);
            } else {
                // Usuário não encontrado, retornar uma resposta apropriada (por exemplo, status 404)
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = SessionController;
