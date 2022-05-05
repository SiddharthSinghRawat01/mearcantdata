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

route.post("/dataregister_1/:id",upload.none(),controller.dataregister_1);

route.post("/dataregister_2/:id",upload.none(),controller.dataregister_2);

route.post("/dataregister_3/:id",upload.none(),controller.dataregister_3);

route.post("/dataregister_4/:id",upload.none(),controller.dataregister_4);

route.post("/dataregister_5/:id",upload.none(),controller.dataregister_5);

route.post("/dataregister_6/:id",upload.none(),controller.dataregister_6);

module.exports = route