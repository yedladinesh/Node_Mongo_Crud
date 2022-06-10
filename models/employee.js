const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required : [true, "First name is required" ]
    },
    last_name: {
        type: String,
        required : [true, "Last name is required"]
    },
    dob:{
        type: String
    },
    address:{
        type: String
    }
});

mongoose.model("Employee",employeeSchema);
