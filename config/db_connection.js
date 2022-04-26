const config = require("./config")

const mysql = require("mysql");

let connection = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USERNAME,
    password : config.DB_PASSWORD,
    database : config.DB_NAME
})

connection.connect((err)=>{
    if(err){
        console.log("err conecting database");
    } else {
        console.log("conected to database");
    }
})

module.exports = connection;