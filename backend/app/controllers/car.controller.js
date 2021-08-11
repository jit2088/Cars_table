const db = require("../models");
const Car = db.cars;

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.make) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Car
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    status: req.body.status //? req.body.status : false
  });

  // Save Car in the database
  car
    .save(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Car."
      });
    });
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  const make = req.query.make;
  var condition = make ? { make: { $regex: new RegExp(make), $options: "i" } } : {};

  Car.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cars."
      });
    });
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Car with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Car with id=" + id });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found!`
        });
      } else res.send({ message: "Car was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Car with id=" + id
      });
    });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Car.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
        });
      } else {
        res.send({
          message: "Car was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id
      });
    });
};

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
  Car.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cars."
      });
    });
};

// Find all sold Cars
exports.findAllSold = (req, res) => {
  Car.find({ status: "Sold" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};

// Find all live
exports.findAllLive = (req, res) => {
  Car.find({ status: "Live" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};
