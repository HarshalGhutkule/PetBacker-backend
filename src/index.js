const express = require("express");
const connect = require("./config/db");
const {register,login} = require("./controllers/authController");

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.listen(8080,async()=>{
    try{
        await connect();
        console.log("listning to port 8080");
    }
    catch(err){
        console.log(err);
    }
})