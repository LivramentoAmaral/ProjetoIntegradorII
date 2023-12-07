const Product = require('../../models/Products')
const User = require('../../models/User');
const { use } = require('../../routes');

const ProductController = {

    async createProduct(req, res) {

        const bodyData = req.body;
        console.log(bodyData)
        console.log(req.file)
        const url_img = 'http://localhost:8000/uploads/' + req.file.filename;
        const { user_id } = req.params;

        try {

            const newProduct = await Product.create({ username: user_id, productImage: url_img, ...bodyData });
            await newProduct.populate("username");

            return res.status(201).json(newProduct);

        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async getUserProducts(req, res) {

        const { user_id } = req.params

        try {

            const userProducts = await Product.find({ username: user_id });
            return res.status(200).json(userProducts);
        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async updateProduct(req, res) {
        const bodyData = req.body;
        const { user_id, product_id } = req.params;

        try {
            let updatedProduct;
            if (req.file) {
                const url_img = 'http://localhost:8000/uploads/' + req.file.filename;
                const updatedData = { ...bodyData, productImage: url_img };
                updatedProduct = await Product.findByIdAndUpdate(product_id, updatedData, { new: true });
            } else {
                updatedProduct = await Product.findByIdAndUpdate(product_id, bodyData, { new: true });
            }

            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async deleteProduct(req, res) {

        const bodyData = req.body
        const { user_id, product_id } = req.params

        try {

            const deletedProduct = await Product.findByIdAndDelete(product_id)
            return res.status(200).json(deletedProduct)

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async getProducts(req, res) {
        try {
            const productsAll = await Product.find();
            const productsWithUsers = await Promise.all(productsAll.map(async (product) => {
                const user = await User.findById(product.username);

                // Verifica se o usuário foi encontrado
                if (user) {
                    // Adiciona os detalhes do usuário ao produto
                    return {
                        ...product.toObject(),
                        username: {
                            _id: user._id,
                            farm: user.farm,
                            username: user.username,
                            // Adicione aqui outros campos do usuário que você deseja incluir nos produtos
                        }
                    };
                } else {
                    // Se o usuário não foi encontrado, retorna o produto sem os detalhes do usuário
                    return {
                        ...product.toObject(),
                        user: null // ou qualquer valor padrão que você queira definir
                    };
                }
            }));
            return res.status(200).json(productsWithUsers);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    ,

    async getProductById(req, res) {

        const { product_id } = req.params

        try {

            const productById = await Product.findById(product_id);
            return res.status(200).json(productById);

        } catch (error) {
            return res.status(400).json(error);
        }

    }

}

module.exports = ProductController