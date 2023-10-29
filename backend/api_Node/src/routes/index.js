const {Router} = require("express");
const UserContoller = require("../controller/UserContoller");
const SessionController = require("../controller/LoginController");
const ProductController = require("../controller/ProductController");
const CartController = require("../controller/CartController");
const routes = Router();


routes.get('/', (req, res) => {
    res.send('Hello World!');
});


routes.post("/users",UserContoller.createUser)
routes.get("/users",UserContoller.getUsers)
routes.get("/users/:user_id",UserContoller.getUserById)

routes.post("/session",SessionController.createSession)

routes.get("/products",ProductController.getProducts)
routes.post("/products/:user_id",ProductController.createProduct)
routes.get("/:user_id/products",ProductController.getUserProducts)
routes.get("/products/:product_id",ProductController.getProductById)
routes.patch("/products/:user_id/:product_id",ProductController.updateProduct)
routes.delete("/products/:user_id/:product_id",ProductController.deleteProduct)


routes.post("/cart/:user_id",CartController.createCart)
routes.get("/cart/:user_id",CartController.getUserCart)
routes.get("/cart/:user_id/:cart_id",CartController.getCart )


module.exports = routes;

