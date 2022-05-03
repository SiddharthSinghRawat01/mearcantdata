const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config/config.js");
const connection = require("./config/db_connection.js");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100)
    }
  }));

app.use(require("./route/route"));


app.listen(config.DB_PORT,(req,res)=>{
    console.log("https://locolhost:PORT")
})