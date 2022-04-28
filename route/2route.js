const express = require("express");
const controller = require("../controler/2UserController");
const path = require('path');
const multer = require("multer");
const cookieParser = require('cookie-parser');

const route = express.Router();
route.use(cookieParser())


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

console.log('working///////////////////////////')

route.post("/register",upload.none(),controller.register)

module.exports = route