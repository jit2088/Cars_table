import React, { useState } from "react";
import CarDataService from "../services/CarService";

const AddCar = () => {
  const initialCarState = {
    id: null,
    make: "",
    model: "",
    year: 0,
    price: 0,
    status: "Available"
  };
  const [car, setCar] = useState(initialCarState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const saveCar = () => {
    var data = {
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price
    };

   CarDataService.create(data)
      .then(response => {
        setCar({
          id: response.data.id,
          make: response.data.make,
          model: response.data.model,
          year: response.data.year,
          price: response.data.price,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCar = () => {
    setCar(initialCarState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCar}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="make">Make</label>
            <input
              type="text"
              className="form-control"
              id="make"
              required
              value={car.make}
              onChange={handleInputChange}
              name="make"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              required
              value={car.model}
              onChange={handleInputChange}
              name="model"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              className="form-control"
              id="year"
              required
              value={car.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={car.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={car.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>

          <button onClick={saveCar} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCar;
