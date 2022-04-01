const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const connection = require("../config/db_connection");

const route = express();
route.use(bodyParser.urlencoded({extended: true}));
route.use(bodyParser.json());

route.get("/",(req,res)=>{
    res.send("getting")
})

//register dashbord
route.post("/log-in",(req,res)=>{
    const Email = req.body.email
    const Mobile = req.body.mobile

    sql = "SELECT email,mobile_no FROM tbl_user WHERE email ='"+Email+"' Or mobile_no ='"+Mobile+"'"
    connection.query(sql,(err,user)=>{
        if(user) {
            console.log(user[0].email)
            if (user[0].email === Email ){
                console.log("noo user")
            }else{
                console.log("user")
            }
            
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


//bussines profile



route.post("/change_password",(req,res)=>{
    const Password = req.body.password
    const Email = req.body.email



    const sql = "SELECT * FROM TABLE_NAME WHERE name = '"+Email+"'";
    connection.query(sql,(err,foundUser)=>{
        if(err){throw err} 
        else if (!foundUser){
            console.log("no user of this name exist")
            // res.send("/login")
        } else {
            console.log(foundUser[0].email)
            bcrypt.compare(Password,foundUser[0].password,(err,foundPassword)=>{
                if (err){throw err} 
                else if (!foundPassword){
                    console.log("incrrect password")
                    // res.send("/login")
                } else {

                    const sql = "UPDATE TABLE_NAME SET password = '"+Password+"' where email = '"+foundUser[0].email+"'"
                    connection.query(sql,(err,update)=>{
                        if(err){throw err}
                        else {
                            console.log("password Updated")
                        }
                    });
                }
            })

        }
    })

});




module.exports = route