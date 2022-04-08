const express = require("express");
const app = express();
const config = require("./config/config.js")
const connection = require("./config/db_connection.js")




app.use(require("./route/route"));

app.listen(config.DB_PORT,(req,res)=>{
    console.log("https://locolhost:PORT")
})