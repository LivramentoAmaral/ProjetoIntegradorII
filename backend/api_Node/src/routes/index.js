const {Router} = require("express");
const UserContoller = require("../controller/UserContoller");
const routes = Router();


routes.get('/', (req, res) => {
    res.send('Hello World!');
});


routes.post("/users",UserContoller.createUser)
routes.get("/users",UserContoller.getUsers)
routes.get("/users/:user_id",UserContoller.getUserById)

routes.post("/session")

routes.get("/products")
routes.post("/products/:user_id")
routes.get("/products/:user_id")
routes.get("/products/:product_id")
routes.patch("/products/:user_id/:product_id")
routes.delete("/products/:user_id/:product_id")


routes.post("/cart/:user_id")
routes.get("/cart/:user_id")
routes.get("/cart/:user_id/:cart_id")


module.exports = routes;

