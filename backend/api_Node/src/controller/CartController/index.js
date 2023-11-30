const Cart = require('../../models/Cart');
const User = require('../../models/User');

const CartController = {



    async createCart(req, res) {
        const bodyData = req.body;
        const { user_id } = req.params; // Obtém o user_id da URL
        console.log(bodyData);
        try {
            const createCart = await Cart.create({
                ...bodyData,
                username: user_id,
                address: user_id,
                phoneWhatzap: user_id
            });
            await createCart.populate('products');
            return res.status(201).json(createCart);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async getUserCart(req, res) {
        const { user_id } = req.params;
    
        try {
            const userCart = await Cart.find({ username: user_id }).populate({
                path: 'products',
                populate: {
                    path: 'username', // Substitua 'createdBy' pelo campo correto que faz referência ao criador do produto
                    model: User // Substitua 'User' pelo modelo correto do usuário
                }
            }).populate("username");
    
            return res.status(200).json(userCart);
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    
    async getCart(req, res) {
        const { user_id, cart_id } = req.params;
    
        try {
            const cart = await Cart.findById(cart_id).populate({
                path: 'products',
                populate: {
                    path:'username', // Substitua 'createdBy' pelo campo correto que faz referência ao criador do produto
                    model: User // Substitua 'User' pelo modelo correto do usuário
                }
            });
    
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
}

module.exports = CartController;