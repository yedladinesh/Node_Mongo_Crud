const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const employeeModel = mongoose.model("Employee");

// Save employee data
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Please complete all fields",
    });
  }
  try {
    var empData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      address: req.body.address,
    };
    const employee = new employeeModel(empData);
    employee
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Employee data saved..",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          response: "error",
          message: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "error",
      data: error.message,
    });
  }
};

// Get employees list
exports.list = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "error",
      data: error,
    });
  }
};

// Delete employee
exports.empDelete = async (req, res) => {
  try {
    var id = req.params.id;
    employeeModel.deleteOne({_id: id}, function(err, result){
      if(result.deletedCount === 1){
        res.status(200).json({
          message: "Employee deleted successfully..",
          data: id,
        });
      }else{
        res.status(404).json({
          message: "No data found...",
        });
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "error",
      data: error,
    });
  }
};
