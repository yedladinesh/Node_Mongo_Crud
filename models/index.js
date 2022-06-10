const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect with databse
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true} ,(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Successfull connected with database..!");
    }
});

const employee = require("./employee");