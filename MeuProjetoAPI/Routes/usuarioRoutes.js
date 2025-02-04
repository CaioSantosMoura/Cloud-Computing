const express = require("express");
const router = express.router();
import userController from "../Controllers/apiUsuario";


router.post("/add_usuario", userController.create);
router.delete("/delete_usuario/:id", userController.deleteUserById);
router.put("/update_usuario/:id", userController.updateById);
router.get("/get_all_usuarios", userController.getUser);
router.get("/usuario/:id", userController.getById);

module.exports = router;