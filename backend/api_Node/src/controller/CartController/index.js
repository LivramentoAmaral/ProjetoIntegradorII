const Cart = require('../../models/Cart');

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

        try {

        } catch (error) {
            return res.status(400).json(error)
        }

    },

    async getCart(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error)
        }

    }


}

module.exports = CartController;