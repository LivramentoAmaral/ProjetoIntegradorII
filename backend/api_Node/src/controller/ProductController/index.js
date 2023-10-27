const Product = require('../../models/Products')

const ProductController = {

    async createProduct(req, res) {

        const bodyData = req.body;
        const { user_id } = req.params;

        try {

            const newProduct = await Product.create({username:user_id, ...bodyData});
            await newProduct.populate('username');
            
            return res.status(201).json(newProduct);

        } catch (error) {
            return res.status(400).json(error);
        }


    },

    async getUserProducts(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async updateProduct(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async deleteProduct(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async getProducts(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async getProductById(req, res) {

        try {

        } catch (error) {
            return res.status(400).json(error);
        }

    }

}

module.exports = ProductController