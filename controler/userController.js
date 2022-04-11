const path = require('path');
const connection = require("../config/db_connection")
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require('jsonwebtoken');




let foriginKey 

const userco = {

    register: (req,res)=>{
        let Userid = req.body.userid;
        const Password = req.body.password;
        const ConfirmPassword = req.body.confirmPassword;
        
        // Company proile
        const CompanyName = req.body.companyName; // bname
        const TradingAs = req.body.tradingAs; // account_type
        const RegisteredAdd = req.body.registeredAdd;  // blocation
        const CompanyNumber = req.body.companyNumber; // mobile_no
        const Country = req.body.country; // country
        const Fname = req.body.fname; // fname
        const Lname = req.body.lname; // lname
        const MainContact =  Fname +" "+ Lname ;  //name
        const MainEmail = req.body.mainEmail; // main_contact_email


        // Directo's Info

        const FullName = req.body.fullName; // director1_name
        const DOB = req.body.dob; // director1_dob
        const Nationality = req.body.nationality; // director1_nationality
        const D2FullName = req.body.d2FullName; // director2_name
        const D2DOB = req.body.d2dob; // director2_dob
        const D2Nationality = req.body.d2Nationality; // director2_nationality
        
        // Share Holder Info

        const SFullName = req.body.sfullName; // shareholder1_name
        const SDOB = req.body.sdob; // shareholder1_dob
        const SNationality = req.body.snationality; // shareholder1_nationality
        const S2FullName = req.body.s2FullName; // shareholder2_name
        const S2DOB = req.body.s2dob; //shareholder2_dob
        const S2Nationality = req.body.s2Nationality; //shareholder2_nationality

    
        // Solutiion apply for

        const SelectCountry = req.body.selectCountry; // solution_apply_for_country
        const ModeofSolution = req.body.modeofSolution; // mode_of_solution

        function validEmail(email){
            const formate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return formate.test(email);
        }
    
        function validNumber(number){
            const formate = /^\d{10}$/;
            return formate.test(number);
        }
    

        if(ConfirmPassword != Password){
            console.log("password do not match")
        }
        if(ConfirmPassword === Password){
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
                            sql = "INSERT INTO tbl_user (email,password,bname,account_type,blocation,mobile_no,country,fname,lname,name,main_contact_email,director1_name,director1_dob,director1_nationality,director2_name,director2_dob,director2_nationality, shareholder1_name,shareholder1_dob,shareholder1_nationality,shareholder2_name,shareholder2_dob,shareholder2_nationality,solution_apply_for_country,mode_of_solution) VALUE ('"+Userid+"','"+hashPassword+"','"+CompanyName+"','"+TradingAs+"','"+RegisteredAdd+"','"+CompanyNumber+"','"+Country+"','"+Fname+"','"+Lname+"','"+MainContact+"','"+MainEmail+"','"+FullName+"','"+DOB+"','"+Nationality+"','"+D2FullName+"','"+D2DOB+"','"+D2Nationality+"','"+SFullName+"','"+SDOB+"','"+SNationality+"','"+S2FullName+"','"+S2DOB+"','"+S2Nationality+"','"+SelectCountry+"','"+ModeofSolution+"')"

                        }
                    
                        if (validNumber(Userid)){
                            sql = "INSERT INTO tbl_user (mobile_no,password,bname,account_type,blocation,mobile_no,country,fname,lname,name,main_contact_email,director1_name,director1_dob,director1_nationality,director2_name,director2_dob,director2_nationality, shareholder1_name,shareholder1_dob,shareholder1_nationality,shareholder2_name,shareholder2_dob,shareholder2_nationality,solution_apply_for_country,mode_of_solution) VALUE ('"+Userid+"','"+hashPassword+"','"+CompanyName+"','"+TradingAs+"','"+RegisteredAdd+"','"+CompanyNumber+"','"+Country+"','"+Fname+"','"+Lname+"','"+MainContact+"','"+MainEmail+"','"+FullName+"','"+DOB+"','"+Nationality+"','"+D2FullName+"','"+D2DOB+"','"+D2Nationality+"','"+SFullName+"','"+SDOB+"','"+SNationality+"','"+S2FullName+"','"+S2DOB+"','"+S2Nationality+"','"+SelectCountry+"','"+ModeofSolution+"')"

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
    }
        
    
        
        
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
    
                        sql = "UPDATE tbl_user set verification_token = '"+token+"' where name = '"+foundUser[0].email+"' OR mobile_no = '"+foundUser[0].mobile_no+"'"
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
    
    },


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
        
        
        const sql = "SELECT id FROM tbl_user WHERE id = '"+foriginKey+"'"
        connection.query(sql,(err,result)=>{
            if(err){throw err}
            if(result.length > 0){
                console.log(result)

                let sql;
        
                if(Seprate_Corporate_Add ){
                    sql="UPDATE tbl_user SET bname  = '"+Bussiness_Name+"',blocation = '"+Bussiness_Location+"',currencies_req = '"+Bussiness_Currencies+"',job_title = '"+Job_Title+"',website = '"+Website+"',busines_Country = '"+Country+"',busines_State = '"+State+"',busines_City = '"+City+"',busines_Code = '"+Zip+"',mobile_no = '"+Phone_Number+"',busines_Fax = '"+Bussiness_Fax+"',corporate_enable = '"+Seprate_Corporate_Add+"',corporate_Location = '"+Corporate_Location+"',corporate_Country = '"+Corporate_Country+"',Corporate_state = '"+Corporate_State+"',corporate_City = '"+Corporate_City+"',corporate_Zip = '"+Corporate_Zip+"' WHERE id = '"+foriginKey+"'" ;
                } else{
            
                    sql="UPDATE tbl_user SET bname = '"+Bussiness_Name+"',blocation = '"+Bussiness_Location+"',currencies_req = '"+Bussiness_Currencies+"',job_title = '"+Job_Title+"',website = '"+Website+"',busines_Country = '"+Country+"',busines_State = '"+State+"',busines_City = '"+City+"',busines_Code = '"+Zip+"',mobile_no = '"+Phone_Number+"',busines_Fax = '"+Bussiness_Fax+"' WHERE id = '"+foriginKey+"'" ;
                }
                connection.query(sql,(err,result)=>{
                    if(err){throw err}
                    console.log(result)
                    res.send(result)
                });                  

            }else(
                console.log("user not found")
            )
        })
        
          
    
    
    
    
    },

    // it should be updated not inserted to tbl_user
    business_funding: (req,res)=>{

        const Account_Holder = req.body.account_Holder 
        const Bank_Account = req.body.bank_Account
        const Bank_Routing = req.body.bank_Routing

        sql = "INSERT INTO TABLENAME () VALUE ('"+ +"')"
            connection.query(sql,(err,result)=>{
                if(err){throw eresultrr}
                if(result){
                    console.log()
                }
            })
    
        
    },

    bussiness_alerts:(req,res)=>{
        const BasicEmail = req.body.basicEmail;
        const DisplaySocialMedia = req.body.displaySocialMedia

        
    },

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