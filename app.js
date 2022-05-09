const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ejs = require("ejs");
const config = require("./config/config.js");
const connection = require("./config/db_connection.js");

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'ejs')
app.set('views','./views')

app.use(require("./route/route"));


app.listen(config.DB_PORT,(req,res)=>{
    console.log("https://locolhost:PORT")
})