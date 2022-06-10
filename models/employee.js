const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required :"Required"
    },
    last_name: {
        type: String,
        required :"Required"
    },
    dob:{
        type: String
    },
    address:{
        type: String
    }
});

mongoose.model("Employee",employeeSchema);
