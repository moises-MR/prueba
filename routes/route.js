const express = require("express");
const router = express.Router();
// const controller = require("../controller/controller");
const userController = require('../controller/userController');
const profileController = require('../controller/profileController');
const codigosController = require('../controller/codigosController');
const multer = require("multer");
const shortid = require("shortid");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination:(req,res,next) => {
     next(null,__dirname+"../../uploads");
 },
 filename: (req,file,next) => {
     const extension = file.mimetype.split("/")[1];
     next(null,`${shortid.generate()}.${extension}`);
 }
});


const upload = multer({storage});



module.exports = () => {

    router.get("/",profileController.home);
    router.post("/searchNameUrl",auth,profileController.searchNameUrl);
    router.post("/create_account",profileController.createAccount);
    router.post("/login",profileController.inicarSesion);
    router.get("/user/:id",auth,profileController.getProfile);
    router.get("/profile_user/:urlName",profileController.getProfileWithNameUrl);
    router.put("/create_profile/:id",auth,upload.array("images"),profileController.createProfile);
    router.put("/imagePortada/:id",auth,upload.single("imagePortada"),profileController.imagePortada);
    router.put("/imageProfile/:id",auth,upload.single("imageProfile"),profileController.imageProfile);
    // router.post("/create_user",userController.createUser);
    router.post("/create_codigo",codigosController.createCodigo);
    router.post("/buscar_codigo",auth,codigosController.searchCodigos);
    router.put("/edit_password",auth,profileController.updatePassword);
    router.put("/update_email",auth,profileController.updateEmail);

    return router
}