import express from 'express';
const router = express.Router();
import usuarioController from "../Controllers/apiUsuario.js";

router.post("/add_usuario", usuarioController.create);
router.delete("/delete_usuario/:id", usuarioController.deleteUserById);
router.put("/update_usuario/:id", usuarioController.updateById);
router.get("/get_all_usuarios", usuarioController.getUser);
router.get("/usuario/:id", usuarioController.getById);

export default router;