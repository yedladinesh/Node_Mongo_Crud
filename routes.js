const employee = require("./controller/employeeController.js");
module.exports = (app) => {
  // Routes
  app.get("/employee/list", employee.list);
  app.post("/employee/create", employee.create);
  app.delete("/employee/:id", employee.empDelete);
  app.put("/employee/:id", employee.empUpdate);
};
