const path = require('path');
const query = require("../config/db_connection")
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRound = 8 ;


let validEmail = function(Email){
    const formate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return formate.test(Email);
}

let Check = (index,confirmIndex)=>{
    let match = index === confirmIndex;
    return match
}

let mail = function(email,token) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rampraveshsingh1996@gmail.com',
            pass: 'PpppP12345'
        }
    });

    let mailDetails = {
        from: 'rampraveshsingh1996@gmail.com',
        to: email,
        subject: 'Test mail',
        html: `<html>
            <h1>"1234"</h1>
            </html>`
    };
    // let EmailTemplate = require('email-templates').EmailTemplate;
    // let send = transporter.templateSender(new EmailTemplate('../views/sent_mail.ejs'));

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Email sent successfully');
            res.send("Email sent successfully")
        }
    });
}


const userco = {

get:(req,res)=>{
    console.log("fjslkdajkfsklfdjmmnsdnfjmifm  fsdfksjfklsajflksflkfl")
    console.log(req.cookies)
    res.send("<h1>Home</h1>")
},    

register: async (req,res)=>{
    try {
     
const Email = req.body.email;
const ConfirmEmail = req.body.confirmEmail;
const Password = req.body.password;
const ConfirmPassword = req.body.confirmPassword

if(!validEmail(Email)){
    // redirect to sign up page
    return console.log("invalid email add")
}
    // check if email = confirm email or password = confirmpassword
     console.log("vallid email "+Email);

    if(Check(Email,ConfirmEmail) && Check(Password,ConfirmPassword)){
        console.log("working")

    let hashPassword = md5(Password);

    let sql2 = "SELECT email FROM tbl_user WHERE email = '"+Email+"'";
    let found = await query(sql2)
        if(found.length > 0){
            console.log(found)
        }else{
            console.log("not found")
        }
    let token = await jwt.sign({user: Email}, 'SECRET');
    console.log(token)
        if(hashPassword){
        let sql = "INSERT INTO tbl_user (email,password,verification_token) VALUE ('"+Email+"','"+hashPassword+"','"+token+"')"
        let inserted = await query(sql);
        if(inserted){
            // mail(Email,token); 
            console.log(inserted)
        }
        return res.send(200,{
            message: "Take your tokem",
            data: {
            }
        })
        } 
        
    }else{
        return console.log("invalid email/password")
    }
 } catch (error) {
    console.log('ERROR',error);
 }


},

dataregister_1 : async (req,res)=>{

    try {
    
    const key = req.body.key
    

    // Company proile
    const CompanyName = req.body.companyName; // bname
    const TradingAs = req.body.tradingDoing; // job_title
    const RegisteredAdd = req.body.registeredAddress;  // blocation
    const CompanyNumber = req.body.companyNumber; // mobile_no
    const Country = req.body.countryofIncorporation; // country
    // const Fname = req.body.fname; // fname
    // const Lname = req.body.lname; // lname
    const MainContact =  req.body.mainContactPerson ;  //name
    const MainEmail = req.body.mainContactEmailAddress; // main_contact_email


    console.log(key,CompanyName,TradingAs,RegisteredAdd,CompanyNumber,Country);

    let sql = "UPDATE tbl_user SET bname = '"+CompanyName+"', job_title = '"+TradingAs+"', blocation = '"+RegisteredAdd+"', mobile_no = '"+CompanyNumber+"', country = '"+Country+"', name = '"+MainContact+"', main_contact_email = '"+MainEmail+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return res.send(200,{
        message: "Update"
    })


    } catch (error) {
        console.log('ERROR',error);
    }

   
},

dataregister_2 : async (req,res)=>{
    try {
        const key = req.body.key;
    // soluthon applying for country
    const SelectCountry = req.body.selectCountry; // solution_apply_for_country
    const ModeofSolution = req.body.modeofSolution; // mode_of_solution

    let sql = "UPDATE tbl_user SET solution_apply_for_country = '"+SelectCountry+"', mode_of_solution = '"+ModeofSolution+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return console.log("update");
        
    } catch (error) {
        console.log('ERROR',error);
    }

    

},
dataregister_3 : async (req,res)=>{
    try {
        const key = req.body.key;
    // Directo's Info

    const DFullName = req.body.dfullName; // director1_name
    const Dob = req.body.dob; // director1_dob
    const Nationality = req.body.nationality; // director1_nationality
    const D2FullName = req.body.d2FullName; // director2_name
    const D2dob = req.body.d2dob; // director2_dob
    const D2Nationality = req.body.d2Nationality; // director2_nationality
    
    let sql = "UPDATE tbl_user SET director1_name ='"+DFullName+"', director1_dob ='"+Dob+"',director1_nationality ='"+Nationality+"',director2_name ='"+D2FullName+"',director2_dob ='"+D2dob+"',director2_nationality ='"+D2Nationality+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return console.log("update");
        
    } catch (error) {
        console.log('ERROR',error);
    }
    
},

dataregister_4 : async (req,res)=>{
    try {
        const key = req.body.key;
    // Share Holder Info

    const SFullName = req.body.sfullName; // shareholder1_name
    const SDob = req.body.sdob; // shareholder1_dob
    const SNationality = req.body.snationality; // shareholder1_nationality
    const S2FullName = req.body.s2FullName; // shareholder2_name
    const S2dob = req.body.s2dob; //shareholder2_dob
    const S2Nationality = req.body.s2Nationality; //shareholder2_nationality

    let sql = "UPDATE tbl_user SET shareholder1_name ='"+SFullName+"', shareholder1_dob ='"+SDob+"',shareholder1_nationality ='"+SNationality+"',shareholder2_name ='"+S2FullName+"',shareholder2_dob ='"+S2dob+"',shareholder2_nationality ='"+S2Nationality+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return console.log("update");

    } catch (error) {
        console.log('ERROR',error);
    }
    
},

dataregister_5 : async (req,res)=>{
    try {
        const key = req.body.key;
        // company Profile

    const Website = req.body.website;
    const NatureOfBusiness = req.body.natureOfBusiness;
    const MontthlyVolume = req.body.montthlyVolume;
    const AverageTicketSize = req.body.averageTicketSize;

    let sql = "UPDATE tbl_user SET website ='"+Website+"', job_title ='"+NatureOfBusiness+"', company_estimated_monthly_volume ='"+MontthlyVolume+"',company_avarage_ticket_size ='"+AverageTicketSize+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return console.log("update");
    } catch (error) {
        console.log('ERROR',error);
    }
    

},

dataregister_6 : async (req,res)=>{
    try {
        const key = req.body.key
    //company porfile
    // console.log(Payload)

    const SettelmentInfo = req.body.settelmentInfo;
    const WalletAddress = req.body.walletAddress;

    // Settelment Info
    // Crypto Wallet Address (Optional)

    let sql = "UPDATE tbl_user SET settle_currency ='"+SettelmentInfo+"', wallet ='"+WalletAddress+"' WHERE email = '"+key+"'"
    let update = await query(sql);

    return console.log("update_6");
    } catch (error) {
        console.log('ERROR',error);
    }
    

},
/////////////////////////////////////diffferent////////////////////////////////////////

verify: (req,res)=>{

    let Payload = jwt.verify(req.params.id, 'SECRET');

    // button will be used at at front end
    let sql = "UPDATE tbl_user SET email_verification = '1' WHERE email = '"+Payload.user+"'"
    query(sql,(err,update)=>{
    if(err){throw err}
    if(update){
        console.log(update)
    }
    });
},


forgotPassword: (req,res)=>{

    // let Payload = await jwt.verify(req.params.id, 'SECRET');

    let Password = req.body.password

    let sql = "UPDATE tbl_user SET password = '"+Password+"' WHERE email = '"+Payload.user+"'"
    query(sql,(err,update)=>{
    if(err){throw err}
    if(update){
        console.log(update)
        return res.send("password updated")
    }
    });

},

changePassword: async (req,res)=>{
    
    console.log(req.cookies.name);
try {

    const NewPassword = md5(req.body.newPassword)

    let Payout = await jwt.verify(req.cookies.name,'SECRET')
    
    console.log(Payout.user)

    let sql = "UPDATE tbl_user SET password = '"+NewPassword+"' WHERE email = '"+Payout.user+"'";
    let update = await query(sql);
        console.log(update)

} catch (err) {
    console.timeLog('Error',err)
}
 
},

sign_in: (req,res)=>{

    const Email = req.body.email
    const Password = md5(req.body.password)

    let sql = "SELECT * FROM tbl_user WHERE email = '"+Email+"' AND password = '"+Password+"'"
    query(sql,(err,user)=>{
        if(err){throw err}
        if(user.length > 0){
            let token = jwt.sign({user: Email}, 'SECRET');
            console.log(token)
            const coo = res.cookie('name', token)
             return res.send(200,{
                message: "Take your tokem",
                data: user
            });
        }else{
            return res.send("Email Password do not match")
        }
    });
}



}


module.exports = userco