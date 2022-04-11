
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





        sql = "INSERT INTO tbl_user (email,password,bname,account_type,blocation,mobile_no,country,fname,lname,name,main_contact_email,director1_name,director1_dob,director1_nationality,director2_name,director2_dob,director2_nationality, shareholder1_name,shareholder1_dob,shareholder1_nationality,shareholder2_name,shareholder2_dob,shareholder2_nationality,solution_apply_for_country,mode_of_solution) VALUE ('"+Userid+"','"+hashPassword+"','"+CompanyName+"','"+TradingAs+"','"+RegisteredAdd+"','"+CompanyNumber+"','"+Country+"','"+Fname+"','"+Lname+"','"+MainContact+"','"+MainEmail+"','"+FullName+"','"+DOB+"','"+Nationality+"','"+D2FullName+"','"+D2DOB+"','"+D2Nationality+"','"+SFullName+"','"+SDOB+"','"+SNationality+"','"+S2FullName+"','"+S2DOB+"','"+S2Nationality+"','"+SelectCountry+"','"+ModeofSolution+"')"


        {
            "userid" : "siddharthsinghrawat@gmail.com",
            "Password" : "1234",
            "ConfirmPassword" : "1234",
            "CompanyName" : "akontopay",
            "TradingAs" : "1",
            "RegisteredAdd" : "noida",
            "CompanyNumber" : "113214679",
            "Country" : "India",
            "Fname" : "siddharth",
            "Lname" : "rawat",
            "MainContact" : "7894561230",
            "MainEmail" : "fjaskf@lkfasjd.com",
            "FullName" : "sid",
            "DOB" : "121212",
            "Nationality" : "americaa",
            "D2FullName" : "sidhu",
            "D2DOB" : "125154",
            "D2Nationality" : "brazil",
            "SFullName" : "anju",
            "SDOB" : "8546456",
            "SNationality" : "assam",
            "S2FullName" : "sweety",
            "S2DOB" : "1132",
            "S2Nationality" : "uk"
           }