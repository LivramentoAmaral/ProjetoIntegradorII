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
                    path: 'username', // Substitua 'createdBy' pelo campo correto que faz referência ao criador do produto
                    model: User // Substitua 'User' pelo modelo correto do usuário
                }
            });

            return res.status(200).json(cart);
        } catch (error) {
            return res.status(400).json(error)
        }
    },

    async deleteProductFromCart(req, res) {
        const { user_id, cart_id} = req.params;
        const { product_id } = req.body;

        try {
            // Encontrar o carrinho do usuário
            const cart = await Cart.findById(cart_id);

            // Verificar se o carrinho existe
            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }
            // Verificar se o produto está no carrinho
            const index = cart.products.indexOf(product_id);
            if (index === -1) {
                return res.status(404).json({ message: "Produto não encontrado no carrinho" });
            }

            // Remover o produto do array de produtos no carrinho
            cart.products.splice(index, 1);

            // Salvar as alterações no carrinho
            await cart.save();

            // Retornar o carrinho atualizado
            const updatedCart = await Cart.findById(cart_id).populate({
                path: 'products',
                populate: {
                    path: 'username',
                    model: User
                }
            });

            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    async addProductToCart(req, res) {
        const { user_id, cart_id } = req.params;
        const { product_id } = req.body;

        try {
            // Encontrar o carrinho do usuário
            const cart = await Cart.findById(cart_id);

            // Verificar se o carrinho existe
            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            // Adicionar o novo produto ao array de produtos no carrinho
            cart.products.push(product_id);

            // Salvar as alterações no carrinho
            await cart.save();

            // Retornar o carrinho atualizado
            const updatedCart = await Cart.findById(cart_id).populate({
                path: 'products',
                populate: {
                    path: 'username',
                    model: User
                }
            });

            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

}

module.exports = CartController;