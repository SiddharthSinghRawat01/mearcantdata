const path = require('path');
const connection = require("../config/db_connection")
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require('jsonwebtoken');




let foriginKey 

const userco = {

    register: (req,res)=>{
        let Userid = req.body.userid
        const Password = req.body.password
        

        function validEmail(email){
            const formate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return formate.test(email);
        }
    
        function validNumber(number){
            const formate = /^\d{10}$/;
            return formate.test(number);
        }
    
        const sql = "SELECT email,mobile_no FROM tbl_user WHERE email = '"+Userid+"' OR mobile_no = '"+Userid+"'  "
        connection.query(sql,(err,exist)=>{
            if(err){throw err }
            if(exist.length >0){
                console.log("user already exist")
            } else {
                
                let sql = '';
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
                })

            }
        })
        
    
        
        
    },

    login: (req,res)=>{
        const Userid = req.body.userid
        const Password = req.body.password
    
        // email mobile no. validation
    
        sql = "SELECT * FROM tbl_user WHERE email = '"+Userid+ "' OR mobile_no = '"+Userid+"'"
        connection.query(sql,(err,foundUser)=>{
            if(err){throw err}
            if(foundUser.length > 0){
                console.log()
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
    
                        // let header = res.set("id", foundUser[0].id);
                        // console.log("//")
                        // console.log(res.getHeader("id"));
    
                        foriginKey = foundUser[0].id
                        console.log(foriginKey)
    
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
    },

    // UPDATE
    single_payout: (req,res)=>{
        const AccountNo = req.body.accountNo;
        const IFSC = req.body.ifsc;
        const Amount = req.body.amount;
        const Transaction = req.body.transaction;
        const PayeeName = req.body.payeeName;
        const BeneficeryName = req.body.beneficeryName;
        const Remark = req.body.Remark;
        const OderId = req.body.oderId;
    
        const Sql = "UPDATE tbl_user SET  = ''"

        const sql = "Insert into  tbl_user (name,email) VALUES ('"+AccountNo+"', '"+IFSC+"')"
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            } else{
                console.log(result)
                res.send(result)
            }
        })
    },

    Virtual_Terminal: (req,res)=>{
        console.log("Virtual_Terminal")
        
        const SalesAmount = req.body.salesAmount;
        const Invoice = req.body.invoice;
        const Currency = req.body.currency;
        const Taxable = req.body.taxable;
        const TaxRate = req.body.taxRate;
        const Description = req.body.description;
        const First_Name = req.body.first_Name;
        const Last_Name = req.body.last_Name;
        const Email = req.body.email;
        const Mobile= req.body.mobile;
    
        console.log(foriginKey)
        console.log("sjdfj")

        const sql = "SELECT * FROM tbl_user WHERE id = '"+foriginKey+"'";
        connection.query(sql,(err,foundUser)=>{
            if(err){throw err}
            if(foundUser.length > 0){
        
            console.log(foundUser[0].id )    
            const sql = "Insert into  tbl_merchant_transaction (ammount,invoice_id,ammount_type,discription,i_fname,i_lname,i_email,i_number,user_id) VALUES ('"+SalesAmount+"','"+Invoice+"','"+Currency+"','"+Description+"','"+First_Name+"','"+Last_Name+"','"+Email+"','"+Mobile+"','"+foundUser[0].id+"')"
            connection.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                } else{
                    console.log(result)
                    // res.send(result)
                }
            })
            }
        })
        
    
        
    },

    // feilds all not completed yet because of unknoen feilds 
    // PARTIALLY COMPLETED
    new_invoice: (req,res)=>{
    
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
    
        const sql = "SELECT * FROM tbl_user WHERE id = '"+foriginKey+"'";
        connection.query(sql,(err,foundUser)=>{
            if(err){throw err}
            if(foundUser.length > 0){
                
                let sql;
                if(Taxable){
                    sql = "Insert into  tbl_user_invoice (amount,invoice_no,description,currency,tax_amt,i_fname,i_lname,i_flname,i_email) VALUES ('"+Amount+"', '"+Invoice+"', '"+Description+"', '"+Currency+"', '"+TaxRate+"', '"+IFSC+"', '"+FirstName+"', '"+LastName+"', '"+FirstName+" "+LastName+"', '"+Email+"')" 
                }else{
                    sql = "Insert into  tbl_user_invoice (amount,invoice_no,description,currency,i_fname,i_lname,i_flname,i_email) VALUES ('"+Amount+"', '"+Invoice+"', '"+Description+"', '"+Currency+"','"+IFSC+"', '"+FirstName+"', '"+LastName+"', '"+FirstName+" "+LastName+"', '"+Email+"')"
                }
                
                connection.query(sql,(err,result)=>{
                    if(err){
                        console.log(err)
                    } else{
                        console.log(result)
                        res.send(result)
                    }
                });

            }
        })
    
        
     
    },

    new_employee: (req,res)=>{
        const First_Name = req.body.first_Name
        const Last_Name = req.body.last_Name
        const Name = First_Name + ' ' + Last_Name
        const Number = req.body.number
        const Email = req.body.email
        const Role = req.body.role


        const sql = "INSERT INTO tbl_user_employee (name,mobile_no,email,role,users_id) VALUES ('"+Name+"','"+Number+"','"+Email+"','"+Role+"','"+foriginKey+"')"
        connection.query(sql,(err,result)=>{
            if(err){throw err}
            console.log(result)
            res.send(result)
        })
            }
        
    },


    //UPDATE
    recipt_setting: (req,res)=>{
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
        
        const sql = "SELECT * FROM tbl_user WHERE id = '"+foriginKey+"'";
        connection.query(sql,(err,foundUser)=>{
            if(err){throw err}
            if(foundUser.length > 0){

                let sql = "";
    
                if(BCC_Email_Recipts && Display_Social_Media){
                sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,bcc_email_status,bcc_email,display_soldby,display_smb,fb_user,fb_link,twitter_user,twitter_link,custom_message,merchant_id) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+BCC_Email_Recipts+"','"+BCC_Email_Address+"','"+Display_Sold+"','"+Display_Social_Media+"','"+Facebook_User+"','"+Facebook_Link+"','"+Twitter_User+"','"+Twitter_Link+"','"+Customer_Message+"','"+foundUser[0].id+"')"
                }
                if(BCC_Email_Address){
                    sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,bcc_email_status,bcc_email,display_soldby,merchant_id) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+BCC_Email_Recipts+"','"+BCC_Email_Address+"','"+Display_Sold+"','"+foundUser[0].id+"')"
                }
                if(Display_Social_Media){
                    sql = "INSERT INTO tbl_merchant_receipt_details (image,business_name,street_address,city,state,zip,phone,website,email,display_soldby,display_smb,fb_user,fb_link,twitter_user,twitter_link,custom_message,merchant_id) VALUES ('"+image+"','"+Bussiness_Name+"','"+Street_Address+"','"+City+"','"+State+"','"+Zip+"','"+Phone_Number+"','"+Website+"','"+Email+"','"+Display_Sold+"','"+Display_Social_Media+"','"+Facebook_User+"','"+Facebook_Link+"','"+Twitter_User+"','"+Twitter_Link+"','"+Customer_Message+"','"+foundUser[0].id+"')"
            
                }
                connection.query(sql,(err,result)=>{
                    if(err){throw err}
                    else{ console.log(result); console.log("result INserted")}
                })
                
            }
        })

        
        
    },

    // it shoud be updated not inserted
    bussiness_profile: (req,res)=>{
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
    
    
    
    
    },

    // it should be updated not inserted to tbl_user
    business_funding: (req,res)=>{

        const Account_Holder = req.body.account_Holder 
        const Bank_Account = req.body.bank_Account
        const Bank_Routing = req.body.bank_Routing
    
        
    },

    //bussiness_setting:(req,res)=>{}

    change_password: (req,res)=>{
        const Password = (req.body.password);
        const CurrentPassword = (req.body.currentpass)
    
        console.log(Password)
        console.log("change password "+foriginKey+"")
    
    
        const sql = "SELECT * FROM tbl_user WHERE id = '"+foriginKey+"'";
        connection.query(sql,(err,foundUser)=>{
            if(err){throw err}
            if(foundUser.length > 0){
                console.log(foundUser[0].password)

                bcrypt.compare(CurrentPassword,foundUser[0].password,(err,passwordMatch)=>{
                    if(err){throw err}
                    if(!passwordMatch){
                        console.log("current password != password")
                        // res.redirect(/change_password)
                    }
                    if(passwordMatch){

                        bcrypt.hash(Password,8,(err,hashPassword)=>{
                            if(err){throw err}
                            if(hashPassword){
                                console.log(hashPassword)
                        const sql = "UPDATE tbl_user set password = '"+hashPassword+"' WHERE email = '"+foundUser[0].email+"' "
                        connection.query(sql,(err,update)=>{
                            if(err){throw err}
                            if (update){
                                console.log("updated")
                            }
                        }) 

                            }
                        })
                    }
                })

            }else {
                console.log("no user exist")
            }
        })
    
    }




}

module.exports = userco