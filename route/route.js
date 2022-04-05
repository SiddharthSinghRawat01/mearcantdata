const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const connection = require("../config/db_connection");
const path = require('path');
const multer = require("multer");
const jwt = require('jsonwebtoken');


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

const route = express.Router();
route.use(bodyParser.urlencoded({extended: true}));
route.use(bodyParser.json());

route.get("/",(req,res)=>{
    res.send("getting")
})

//register dashbord
route.post("/register",(req,res)=>{
    let Userid = req.body.userid
    const Password = req.body.password
    let sql = '';

    function validEmail(email){
        const formate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return formate.test(email);
    }

    function validNumber(number){
        const formate = /^\d{10}$/;
        return formate.test(number);
    }

    bcrypt.hash(Password,8,(err,hashPassword)=>{
        if(err){throw err}
        if(hashPassword){
            
            if (validEmail(Userid)){
                sql = "INSERT INTO tbl_user (email,password) VALUE ('"+Userid+"','"+hashPassword+"')"
            }
        
            if (validNumber(Userid)){
                sql = "INSERT INTO tbl_user (mobile_no,password) VALUE ('"+Userid+"','"+hashPassword+"')"
            }

            sql1 = "SELECT * FROM tbl_user WHERE email = '"+Userid+"' OR mobile_no = '"+Userid+"'"
            connection.query(sql1,(err,foundUser,feilds)=>{
                if(err){throw err}
                if(foundUser.length > 0){
                    console.log("user found")
        
                }else{
                    console.log("not found user")
                    connection.query(sql,(err,result)=>{
                        if(err){throw err} 
                        else {
                            console.log(result)
                            
                        }
                    })
                }
            })            
        }
    });
    
});


//login dashbord
route.post("/login",(req,res)=>{
    const Userid = req.body.userid
    const Password = req.body.password

    // email mobile no. validation

    sql = "SELECT * FROM tbl_user WHERE email = '"+Userid+ "' OR mobile_no = '"+Userid+"'"
    connection.query(sql,(err,foundUser)=>{
        if(err){throw err}
        if(foundUser.length > 0){
            console.log(foundUser[0].password)
            bcrypt.compare(Password,foundUser[0].password,(err,passwordMatch)=>{
                if(err){throw err}
                if(!passwordMatch){
                    console.log("incorrect passsword")
                    // res.redirect("/login")
                }
                if(passwordMatch){
                    console.log("password match")
                    // MADE FEILD FOR JWT TOKEN
                    let token = jwt.sign({user: '123'}, 'SECRET')
                    console.log(token)
                    sql = "UPDATE tbl_user set JWToken = '"+token+"' where name = '"+foundUser[0].email+"' OR mobile_no = '"+foundUser[0].mobile_no+"'"
                    connection.query(sql,(err,update,feilds)=>{
                        if (err){throw err}
                        if(update){
                            console.log("12341")
                            console.log(foundUser[0].fname)
                            console.log("updated!!")                            
                        }
                    })
                }

            })

        }else{
            console.log("you shoud register")
            // res.redirect("/register")
        }
    })
})


//database not found
route.post("/Single_payout",(req,res)=>{
    const AccountNo = req.body.accountNo;
    const IFSC = req.body.ifsc;
    const Amount = req.body.amount;
    const Transaction = req.body.transaction;
    const PayeeName = req.body.payeeName;
    const BeneficeryName = req.body.beneficeryName;
    const Remark = req.body.Remark;
    const OderId = req.body.oderId;


    const sql = "Insert into  tbl_user (name,email) VALUES ('"+AccountNo+"', '"+IFSC+"')"
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.send(result)
        }
    })
});


//complete
route.post("/Virtual_Terminal",(req,res)=>{
    console.log("Virtual_Terminal")
    
    const SalesAmount = req.body.salesAmount;
    const Invoice = req.body.invoice;
    const Currency = req.body.currency;
    // const Taxable = req.body.taxable;
    // const TaxRate = req.body.taxRate;
    const Description = req.body.description;
    const First_Name = req.body.first_Name;
    const Last_Name = req.body.last_Name;
    const Email = req.body.email;
    const Mobile= req.body.mobile;
    

    const sql = "Insert into  tbl_merchant_transaction (ammount,invoice_id,ammount_type,discription,i_fname,i_lname,i_email,i_number) VALUES ('"+SalesAmount+"','"+Invoice+"','"+Currency+"','"+Description+"','"+First_Name+"','"+Last_Name+"','"+Email+"','"+Mobile+"')"
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.send(result)
        }
    });
});

//completed by ram
route.post("/new_invoice",(req,res)=>{
    
    const Amount = req.body.amount;
    const Invoice = req.body.invoice;
    const Description = req.body.description;
    const Currency = req.body.currency;
    const Taxable = req.body.taxable;
    const TaxRate = req.body.taxRate;
    const FirstName = req.body.firstName;
    const LastName = req.body.lastName;
    const Email = req.body.email;
    const Send = req.body.send;
    const DueDate = req.body.dueDate;



    const sql = "Insert into  TABLE_NAME (name,email) VALUES ('"+AccountNo+"', '"+IFSC+"')"
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.send(result)
        }
    });
 
});

// complete
route.post("/new_employee",(req,res)=>{
    const First_Name = req.body.first_Name
    const Last_Name = req.body.last_Name
    const Name = First_Name + ' ' + Last_Name
    const Number = req.body.number
    const Email = req.body.email
    const Role = req.body.role

    const sql = "INSERT INTO tbl_user_employee (name,mobile_no,email,role) VALUES ('"+Name+"','"+Number+"','"+Email+"','"+Role+"')"
    connection.query(sql,(err,result)=>{
        if(err){throw err}
        console.log(result)
        res.send(result)
    });

});

// business setting recipt Setting
route.post("/recipt_setting",upload.single("image"),(req,res)=>{
    console.log("image upload")
    
    const image = req.file.filename;
    const Bussiness_Name = req.body.bussiness_Name;
    const Street_Address = req.body.street_Address;
    const City = req.body.city;
    const State = req.body.state
    const Zip = req.body.zip
    const Phone_Number = req.body.phone_Number
    const Website = req.body.website
    const Email = req.body.email

    const BCC_Email_Recipts = req.body.bCC_Email_Recipts
    const BCC_Email_Address = req.body.bCC_Email_Address

    const Display_Sold = req.body.display_Sold

    const Display_Social_Media = req.body.display_Social_Media
    const Facebook_User = req.body.facebook_User
    const Facebook_Link = req.body.facebook_Link
    const Twitter_User = req.body.twitter_User
    const Twitter_Link = req.body.twitter_Link
    const Customer_Message = req.body.customer_Message

    let sql = "";

    if(BCC_Email_Recipts && Display_Social_Media){
    sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,bcc_email_status,bcc_email,display_soldby,display_smb,fb_user,fb_link,twitter_user,twitter_link,custom_message) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+BCC_Email_Recipts+"','"+BCC_Email_Address+"','"+Display_Sold+"','"+Display_Social_Media+"','"+Facebook_User+"','"+Facebook_Link+"','"+Twitter_User+"','"+Twitter_Link+"','"+Customer_Message+"')"
    }
    if(BCC_Email_Address){
        sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,bcc_email_status,bcc_email,display_soldby) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+BCC_Email_Recipts+"','"+BCC_Email_Address+"','"+Display_Sold+"')"
    }
    if(Display_Social_Media){
        sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,display_soldby,display_smb,fb_user,fb_link,twitter_user,twitter_link,custom_message) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+Display_Sold+"','"+Display_Social_Media+"','"+Facebook_User+"','"+Facebook_Link+"','"+Twitter_User+"','"+Twitter_Link+"','"+Customer_Message+"')"

    }
    connection.query(sql,(err,result)=>{
        if(err){throw err}
        else{ console.log(result); console.log("result INserted")}
    })
    
})


//bussines profile not complete complete

route.post("/bussiness_profile",(req,res)=>{
    console.log("business profile")
    const Bussiness_Name = req.body.bussiness_Name
    const Bussiness_Location = req.body.bussiness_Location
    const Bussiness_Currencies = req.body.bussiness_Currencies
    const Job_Title = req.body.job_Title
    const Website = req.body.website
    const Country = req.body.country
    const State = req.body.state
    const City = req.body.city
    const Zip = req.body.zip
    const Phone_Number = req.body.phone_Number
    const Bussiness_Fax = req.body.bussiness_Fax

    const Seprate_Corporate_Add = req.body.seprate_Corporate_Add
    const Corporate_Location = req.body.corporate_Location
    const Corporate_Country = req.body.corporate_country
    const Corporate_State= req.body.corporate_state
    const Corporate_City = req.body.corporate_city
    const Corporate_Zip = req.body.corporate_zip
    let sql;
    if(Seprate_Corporate_Add ){
        sql="INSERT INTO tbl_user (`bname`,`blocation`,`currencies_req`,`job_title`,`website`,`busines_Country`,`busines_State`,`busines_City`,`busines_Code`,`busines_Number`,`busines_Fax`,`corporate_enable`,`corporate_Location`,`corporate_Country`,`Corporate_state`,`corporate_City`,`corporate_Zip`) VALUES ('"+Bussiness_Name+"','"+Bussiness_Location+"','"+Bussiness_Currencies+"','"+Job_Title+"','"+Website+"','"+Country+"','"+State+"','"+City+"','"+Zip+"','"+Phone_Number+"','"+Bussiness_Fax+"','"+Seprate_Corporate_Add+"','"+Corporate_Location+"','"+Corporate_Country+"','"+Corporate_State+"','"+Corporate_City+"','"+Corporate_Zip+"')"
    } else{

        sql="INSERT INTO tbl_user (`bname`,`blocation`,`currencies_req`,`job_title`,`website`,`busines_Country`,`busines_State`,`busines_City`,`busines_Code`,`busines_Number`,`busines_Fax`) VALUES ('"+Bussiness_Name+"','"+Bussiness_Location+"','"+Bussiness_Currencies+"','"+Job_Title+"','"+Website+"','"+Country+"','"+State+"','"+City+"','"+Zip+"','"+Phone_Number+"','"+Bussiness_Fax+"')"
    }
    connection.query(sql,(err,result)=>{
        if(err){throw err}
        console.log(result)
        res.send(result)
    });    




})


// business funding
route.post("/business_funding",(req,res)=>{

    const Account_Holder = req.body.account_Holder 
    const Bank_Account = req.body.bank_Account
    const Bank_Routing = req.body.bank_Routing

    
})


//change password completed by ram
route.post("/change_password",(req,res)=>{
    const Password = md5(req.body.password);
    const CurrentPassword = md5(req.body.currentpass)
    const Email = req.body.email

    console.log(Email)
    console.log(Password)


    const sql = "SELECT * FROM tbl_user WHERE email = '"+Email+"'";
    connection.query(sql,(err,foundUser)=>{
        if(err){throw err}
        if(foundUser.length > 0){
            console.log(foundUser[0].password)
            
            if (currentpass === foundUser[0].password){
                const sql = "UPDATE tbl_user set password = '"+Password+"' WHERE email = '"+foundUser[0].email+"' "
                connection.query(sql,(err,update)=>{
                    if(err){throw err}
                    if (update){
                        console.log("updated")
                    }
                })                
            }else{
                console.log("current pass do not match the password")
            }
            
        }else {
            console.log("no user exist")
        }
    })

});


module.exports = route