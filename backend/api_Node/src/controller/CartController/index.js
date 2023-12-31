const Cart = require('../../models/Cart');
const User = require('../../models/User');

const CartController = {



    async createCart(req, res) {
        const bodyData = req.body;
        const { user_id } = req.params; // Obtém o user_id da URL
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
                },

            });
            await userCart.populate('username');

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
        const { user_id, cart_id } = req.params;
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
        const { cart_id } = req.params;
        const { product_id } = req.body;

        try {
            let cart = await Cart.findById(cart_id);

            // Verificar se o carrinho existe, senão criar um novo
            if (!cart) {
                cart = await Cart.create({ _id: cart_id, products: [product_id] });
            } else {
                // Adicionar o novo produto ao array de produtos no carrinho
                cart.products.push(product_id);
            }

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
            return res.status(400).json({ message: "Erro ao adicionar produto ao carrinho", error: error.message });
        }


    },

    async getCartIdByUserId(req, res) {
        const { user_id } = req.params;
    
        try {
            const cart = await Cart.findOne({ username: user_id }); 
            console.log("cart",cart)// Verifique se o campo é 'username' ou 'user_id'
            if (cart) {
                return res.status(200).json({ cartId: cart._id });
            } else {
                return res.status(404).json({ message: 'Carrinho não encontrado para este usuário' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar o carrinho do usuário', error: error.message });
        }
    },
    
}

module.exports = CartController;