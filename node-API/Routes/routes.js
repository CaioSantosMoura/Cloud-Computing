const express = require("express");
const router = express.Router();
const usuarioController = require("../Controller/usuarioController");
const imagemController = require("../Controller/imagemController");
const awsController = require("../controller/awsController");

router.post("/add_user", usuarioController.addUser);
router.get("/get_user/:name", usuarioController.getUser);
router.get("/get_all_users", usuarioController.getAllUsers);
router.delete("/delete_user/:name", usuarioController.deleteUser);
router.put("/update_user/:name", usuarioController.updateUser);

router.post("/add_image", imagemController.addImage);
router.get("/get_image/:title", imagemController.getImage);
router.get("/get_all_images", imagemController.getAllImages);
router.delete("/delete_image/:title", imagemController.deleteImage);
router.put("update_image/:title", imagemController.updateImage);

router.post("/s3", awsController.uploadFile);
router.get("/s3", awsController.downloadFile);

module.exports = router;
