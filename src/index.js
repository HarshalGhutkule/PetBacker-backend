const express = require("express");
const connect = require("./config/db");
const {register,login, reset} = require("./controllers/authController");
const { body } = require('express-validator');
const cors = require("cors");
const serviceController = require("./controllers/serviceController");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", 
    body("FirstName").isString().notEmpty().isLength({min:3}).withMessage("Username should be atleast of 3 character"),
    body("LastName").isString().notEmpty(),
    body("Email").custom(async (value) => {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (pattern.test(value)) {
          return true;
        }
        throw new Error("You have entered an invalid email address!");
    }),
    body("Password").isString().custom(async (value)=>{
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if(pattern.test(value)) return true;
        throw new Error(("Password is not strong"));
    }),
register);

app.patch(
    "/reset/:id",
    body("ConfirmPassword")
      .isString()
      .custom(async (value) => {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (pattern.test(value)) {
          return true;
        }
        throw new Error("Password is not strong");
      }),
    reset
  );


app.post("/login", login);
app.use("/services", serviceController);
app.use("/users", userController);

app.listen(process.env.PORT || 3001, '0.0.0.0',async()=>{
    try{
        await connect();
        console.log("listning to port 3001");
    }
    catch(err){
        console.log(err);
    }
})