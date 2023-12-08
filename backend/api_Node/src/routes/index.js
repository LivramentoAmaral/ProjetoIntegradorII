const {Router} = require("express");
const UserContoller = require("../controller/UserContoller");
const SessionController = require("../controller/LoginController");
const ProductController = require("../controller/ProductController");
const CartController = require("../controller/CartController");
const UserClienteController = require("../controller/UserClienteController");
const routes = Router();
const upload = require('../utils/upload_imagem')
const validateToken = require("../middlewares/index")


routes.get('/', (req, res) => {
    res.send('Hello World!');
});


routes.post("/users",UserContoller.createUser)
routes.get("/users",UserContoller.getUsers)
routes.get("/users/:user_id",UserContoller.getUserById)

routes.post("/usersclient",UserClienteController.createUserClient)
routes.get("/usersclient",UserClienteController.getUsers)
routes.get("/usersclient/:user_id",UserClienteController.getUserById)

routes.post("/session",SessionController.createSession)

routes.get("/products",ProductController.getProducts)
routes.post("/products/:user_id",validateToken,upload.single('productImage'), ProductController.createProduct)
routes.get("/:user_id/products",validateToken,ProductController.getUserProducts)
routes.get("/products/:product_id",validateToken,ProductController.getProductById)
routes.patch("/products/:user_id/:product_id",validateToken,upload.single('productImage'),ProductController.updateProduct)
routes.delete("/products/:user_id/:product_id",validateToken,ProductController.deleteProduct)


routes.post("/cart/:user_id",CartController.createCart)
routes.get("/cart/:user_id",CartController.getUserCart)
routes.get("/cart/:user_id/:cart_id",CartController.getCart)
routes.delete('/cart/products/:user_id/:cart_id/', CartController.deleteProductFromCart);
routes.post('/cart/:cart_id/:user_id', CartController.addProductToCart);
routes.get('/cart/getCartIdByUserId/:userId', CartController.getCartIdByUserId);

module.exports = routes;