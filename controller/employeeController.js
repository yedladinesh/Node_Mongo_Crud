const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const employeeModel = mongoose.model("Employee");

// Save employee data
exports.create = async (req, res) => {
  console.log(req.body, "body");
  // const employee = new employeeModel();
  // employee.save();
};

// Get employees list
exports.list = async (req, res) => {
  employeeModel.find((err, resp) => {
    if (err) {
      res.status(500).json({
        response: "error",
        message: "No data found...",
      });
    } else {
      res.status(200).json({
        message: "Employees found..",
        data: resp,
      });
    }
  });
};
