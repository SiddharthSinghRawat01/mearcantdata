const path = require('path');
const connection = require("../config/db_connection")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRound = 8 ;


let validEmail = function(Email){
    const formate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return formate.test(Email);
}

let Check = (index,confirmIndex)=>{
    let match = index === confirmIndex;
    return match
}


const userco = {

register: (req,res)=>{
    
const Email = req.body.email;
const ConfirmEmail = req.body.confirmEmail;
const Password = req.body.password;
const ConfirmPassword = req.body.confirmPassword


if(!validEmail(Email)){
    // redirect to sign up page
    return console.log("invalid email add")
}
if(validEmail(Email)){
    // check if email = confirm email or password = confirmpassword
     console.log("vallid email"+Email);

    if(Check(Email,ConfirmEmail) && Check(Password,ConfirmPassword)){
        console.log("working")

        bcrypt.hash(Password,saltRound,(err,hashPassword)=>{
            if(err){throw err}
            if(hashPassword){
                console.log (hashPassword)

                let sql = "INSERT INTO tbl_user (email,password) VALUE ('"+Email+"','"+Password+"')"
                connection.query(sql,(err,inserted)=>{
                    if(err){throw err}
                    if(inserted){
                        console.log(inserted)
                    }
                });

            } 
        });

    }else{
        return console.log("not working")
    }

}


},

dataregister_1 : (req,res)=>{
    const Email = req.body.email;

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

    let sql = "UPDATE tbl_user SET bname = '"+CompanyName+"', account_type = '"+TradingAs+"', blocation = '"+RegisteredAdd+"', mobile_no = '"+CompanyNumber+"', country = '"+Country+"', fname = '"+Fname+"', lname = '"+Lname+"', name = '"+MainContact+"', main_contact_email = '"+MainEmail+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });

},

dataregister_2 : (req,res)=>{
    const Email = req.body.email;

    // soluthon applying for country
    const SelectCountry = req.body.selectCountry; // solution_apply_for_country
    const ModeofSolution = req.body.modeofSolution; // mode_of_solution

    let sql = "UPDATE tbl_user SET solution_apply_for_country = '"+SelectCountry+"', mode_of_solution = '"+ModeofSolution+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });

},
dataregister_3 : (req,res)=>{
    const Email = req.body.email;

    // Directo's Info

    const DFullName = req.body.dfullName; // director1_name
    const Dob = req.body.dob; // director1_dob
    const Nationality = req.body.nationality; // director1_nationality
    const D2FullName = req.body.d2FullName; // director2_name
    const D2dob = req.body.d2dob; // director2_dob
    const D2Nationality = req.body.d2Nationality; // director2_nationality
    
    let sql = "UPDATE tbl_user SET director1_name ='"+DFullName+"', director1_dob ='"+Dob+"',director1_nationality ='"+Nationality+"',director2_name ='"+D2FullName+"',director2_dob ='"+D2dob+"',director2_nationality ='"+D2Nationality+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });
},

dataregister_4 : (req,res)=>{
    const Email = req.body.email;

    // Share Holder Info

    const SFullName = req.body.sfullName; // shareholder1_name
    const SDob = req.body.sdob; // shareholder1_dob
    const SNationality = req.body.snationality; // shareholder1_nationality
    const S2FullName = req.body.s2FullName; // shareholder2_name
    const S2dob = req.body.s2dob; //shareholder2_dob
    const S2Nationality = req.body.s2Nationality; //shareholder2_nationality

    let sql = "UPDATE tbl_user SET shareholder1_name ='"+SFullName+"', shareholder1_dob ='"+SDob+"',shareholder1_nationality ='"+SNationality+"',shareholder2_name ='"+S2FullName+"',shareholder2_dob ='"+S2dob+"',shareholder2_nationality ='"+S2Nationality+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });
},

dataregister_5 : (req,res)=>{
    const Email = req.body.email;
    // company Profile

    const Website = req.body.website;
    const NatureOfBusiness = req.body.natureOfBusiness;
    const MontthlyVolume = req.body.montthlyVolume;
    const AverageTicketSize = req.body.averageTicketSize;

    let sql = "UPDATE tbl_user SET website ='"+Website+"', job_title ='"+NatureOfBusiness+"', company_estimated_monthly_volume ='"+MontthlyVolume+"',company_avarage_ticket_size ='"+AverageTicketSize+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });

},

dataregister_6 : (req,res)=>{
    const Email = req.body.email;
    //company porfile

    const SettelmentInfo = req.body.settelmentInfo;
    const WalletAddress = req.body.walletAddress;

    // Settelment Info
    // Crypto Wallet Address (Optional)

    let sql = "UPDATE tbl_user SET settle_currenct ='"+SettelmentInfo+"', wallet ='"+WalletAddress+"' WHERE email = '"+Email+"'"
    connection.query(sql,(err,update)=>{
        if(err){throw err}
        if(update){
            console.log(update)
        }
    });

},


dataregister : (req,res)=>{
    
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

    //NEW
    // soluthon applying for country

    const SelectCountry = req.body.selectCountry; // solution_apply_for_country
    const ModeofSolution = req.body.modeofSolution; // mode_of_solution

    // Directo's Info

    const DFullName = req.body.dfullName; // director1_name
    const Dob = req.body.dob; // director1_dob
    const Nationality = req.body.nationality; // director1_nationality
    const D2FullName = req.body.d2FullName; // director2_name
    const D2dob = req.body.d2dob; // director2_dob
    const D2Nationality = req.body.d2Nationality; // director2_nationality
    
    // Share Holder Info

    const SFullName = req.body.sfullName; // shareholder1_name
    const SDob = req.body.sdob; // shareholder1_dob
    const SNationality = req.body.snationality; // shareholder1_nationality
    const S2FullName = req.body.s2FullName; // shareholder2_name
    const S2dob = req.body.s2dob; //shareholder2_dob
    const S2Nationality = req.body.s2Nationality; //shareholder2_nationality

    //////////////// company pofile new

    // Website / Processing URL
    // Nature of Business
    // Estimated Monthly Volume per Market (in USD) 
    // Average Ticket Size (in USD)

    //////////////company porfile
    // Settelment Info
    // Crypto Wallet Address (Optional)


    // let sql = `UPDATE tbl_user SET bname = '${CompanyName}', account_type = '${TradingAs}', blocation = '${RegisteredAdd}',+
    //  mobile_no = '${CompanyNumber}', country = '${Country}', fname = '${Fname}', lname = '${Lname}', name = '${MainContact}',+
    //  main_contact_email = '${MainEmail}', solution_apply_for_country = '${SelectCountry}', mode_of_solution ='${ModeofSolution}',+
    //  director1_name = '${DFullName}',director1_dob = '${Dob}', director1_nationality = '${Nationality}', director2_name = '${D2FullName}'+
    //  director2_dob = '${D2dob}',director2_nationality = '${D2Nationality}', shareholder1_name = '${SFullName}',+
    //  shareholder1_dob '${SDob}', shareholder1_nationality= '${SNationality}', shareholder2_name = '${S2FullName}', shareholder2_dob = '${S2dob}',+
    //  shareholder2_nationality= '${S2Nationality}'`

    
     connection.query()


}





}

module.exports = userco