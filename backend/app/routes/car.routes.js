module.exports = app => {

  const cars = require("../controllers/car.controller.js");

  var router = require("express").Router();

  // Count cars by status
  

  // Create a new Car
  router.post("/", cars.create);

  // Retrieve all Cars
  router.get("/", cars.findAll);

  // Retrieve all sold Cars
 
  router.get("/sold", cars.findAllSold);
  //router.get("/live", cars.findAllLive);

  // Retrieve a single Car with id
  router.get("/:id", cars.findOne);

  // Update a Car with id
  router.put("/:id", cars.update);

  // Delete a Car with id
  router.delete("/:id", cars.delete);

  // Create a new Car
  router.delete("/", cars.deleteAll);

  app.use("/api/cars", router);
};
