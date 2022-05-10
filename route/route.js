const express = require("express");
const controller = require("../controler/User_2Controller");
const path = require('path');
const multer = require("multer");

const route = express.Router();


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname,'../image'));
    },
    filename : function(req, file, cb){
        let imgname = new Date().toString();
        imgname = imgname.replace(/ |:|\+|\(|\)/gi, '-');
        let imgext = path.extname(file.originalname);
        let image = `${imgname}${imgext}`;
        cb(null, image);
    }
});
const upload = multer({storage: storage});

route.get("/",controller.get);

route.post("/register",upload.none(),controller.register);

route.post("/sign_in",upload.none(),controller.sign_in);

route.post("/dataregister_1",upload.none(),controller.dataregister_1);

route.post("/dataregister_2",upload.none(),controller.dataregister_2);

route.post("/dataregister_3",upload.none(),controller.dataregister_3);

route.post("/dataregister_4",upload.none(),controller.dataregister_4);

route.post("/dataregister_5",upload.none(),controller.dataregister_5);

route.post("/dataregister_6",upload.none(),controller.dataregister_6);

route.get("/verify/:token",upload.none(),controller.verify);

route.post("/forgotPassword/:token",upload.none(),controller.forgotPassword);

module.exports = route