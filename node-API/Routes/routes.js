const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");
const imagemController = require("../controller/imagemController");
const awsController = require("../controller/awsController");

router.post("/add_user", usuarioController.addUsuario);
router.get("/get_user/:name", usuarioController.getUsuario);
router.get("/get_all_users", usuarioController.getAllUsuarios);
router.delete("/delete_user/:name", usuarioController.deleteUsuario);
router.put("/update_user/:name", usuarioController.updateUsuario);

router.post("/add_image", imagemController.addImagem);
router.get("/get_image/:title", imagemController.getImagem);
router.get("/get_all_images", imagemController.getAllImagems);
router.delete("/delete_image/:title", imagemController.deleteImagem);
router.put("update_image/:title", imagemController.updateImagem);

router.post("/s3", awsController.uploadFile);
router.get("/s3", awsController.downloadFile);

module.exports = router;
