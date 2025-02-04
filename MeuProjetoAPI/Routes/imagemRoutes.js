const express = require("express");
const router = express.router();
import imagemController from "../Controllers/apiImagem";

router.post("/add_imagem", imagemController.create);
router.delete("/delete_imagem/:id", imagemController.deleteImagemById);
router.put("/update_imagem/:id", imagemController.updateById);
router.get("/get_all_imagens", imagemController.getImagem);
router.get("/imagem/:id", imagemController.getById);

module.exports = router;