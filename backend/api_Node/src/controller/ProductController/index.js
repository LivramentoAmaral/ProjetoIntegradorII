const Product = require('../../models/Products')

const ProductController = {

    async createProduct(req, res) {

        const bodyData = req.body;
        const { user_id } = req.params;

        try {

            const newProduct = await Product.create({ username: user_id, ...bodyData });
            await newProduct.populate("username");

            return res.status(201).json(newProduct);

        } catch (error) {
            return res.status(400).json(error);
        }


    },

    async getUserProducts(req, res) {

        const { user_id } = req.params

        try {

            const userProducts = await Product.find({ username: user_id }).populate("farm");
            return res.status(201).json(userProducts);
        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async updateProduct(req, res) {

        const bodyData = req.body
        const {user_id, product_id} = req.params

        try {

          const updatedProduct = await Product.findByIdAndUpdate(product_id,bodyData,{new:true})
          return res.status(201).json(updatedProduct)

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async deleteProduct(req, res) {

        const bodyData = req.body
        const {user_id, product_id} = req.params
        
        try {

            const deletedProduct = await Product.findByIdAndDelete(product_id)
            return res.status(201).json(deletedProduct)

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async getProducts(req, res) {

        try {

            const productsAll = await Product.find().populate("username");
            return res.status(201).json(productsAll);

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async getProductById(req, res) {

        const { product_id } = req.params

        try {
                
                const productById = await Product.findById(product_id);
                return res.status(201).json(productById);

        } catch (error) {
            return res.status(400).json(error);
        }

    }

}

module.exports = ProductController