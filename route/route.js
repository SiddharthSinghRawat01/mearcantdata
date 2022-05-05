const express = require("express");
const controller = require("../controler/userController");
const path = require('path');
const multer = require("multer");

const route = express.Router();

route.use("/route2",require("./2route"))



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




route.get("/gettransaction",controller.gettransaction);

route.get("/gettransactionview",controller.gettransactionview);


//register dashbord
route.post("/register",upload.none(),controller.register);


//login dashbord
route.post("/login",upload.none(),controller.login);


//database not found
route.post("/Single_payout",upload.none(),controller.single_payout);


//complete
route.post("/Virtual_Terminal",upload.none(),controller.Virtual_Terminal);

//completed by ram
route.post("/new_invoice",upload.none(),controller.new_invoice);

// complete
route.post("/new_employee",upload.none(),controller.new_employee);

// business setting recipt Setting
route.post("/recipt_setting",upload.single("image"),controller.recipt_setting)


//bussines profile not complete complete

route.post("/bussiness_profile",upload.none(),controller.bussiness_profile)


// business funding
route.post("/business_funding",upload.none(),controller.business_funding)

// business alert
route.post("/bussiness_alerts",upload.none(),controller.bussiness_alerts)

//change password not completed by md5 removes
route.post("/change_password",upload.none(),controller.change_password);


module.exports = route