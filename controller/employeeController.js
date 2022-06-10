const mongoose = require("mongoose");
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
          message:
            resp.length > 0 ? "Employees found.." : "Employees not found..",
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
    employeeModel
      .remove({ _id: id })
      .then((result) => {
        result.deletedCount > 0
          ? res.status(200).json({
              message: "Employee deleted successfully..",
              data: result,
            })
          : res.status(404).json({
              message: "Error",
              data: "No data found..",
            });
      })
      .catch((err) => {
        res.status(404).json({
          message: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

// Edit employee detail
exports.empUpdate = async (req, res) => {
  try {
    var id = req.params.id;
    employeeModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            address: req.body.address,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        res.status(200).json({
          message: "Employee data updated",
          data: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "error",
          error: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
