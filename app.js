const express = require("express");
const PORT = 3000
const app = express();
const config = require("./config/config.js")
const connection = require("./config/db_connection.js")




app.use(require("./route/route"));

app.listen(PORT,(req,res)=>{
    console.log("https://locolhost:PORT")
})