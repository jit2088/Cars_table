import React, { useState, useEffect } from "react";
import CarDataService from "../services/CarService";

const Car = props => {
  const initialCarState = {
    id: null,
    make: "",
    model: "",
    year: 0,
    price: 0,
    status: "Live"
  };
  const [currentCar, setCurrentCar] = useState(initialCarState);
  const [message, setMessage] = useState("");

  const getCar = id => {
    CarDataService.get(id)
      .then(response => {
        setCurrentCar(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCar(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCar({ ...currentCar, [name]: value });
  };

  // const updatePublished = status => {
  //   var data = {
  //     id: currentCar.id,
  //     make: currentCar.make,
  //     model: currentCar.model,
  //     year: currentCar.year,
  //     price: currentCar.price,
  //     status: currentCar.status
  //   };

  //   CarDataService.update(currentCar.id, data)
  //     .then(response => {
  //       setCurrentCar({ ...currentCar, published: status });
  //       console.log(response.data);
  //       setMessage("The status was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const updateCar = () => {
    CarDataService.update(currentCar.id, currentCar)
      .then(response => {
        console.log(response.data);
        setMessage("The Car was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCar = () => {
    CarDataService.remove(currentCar.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/cars");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCar ? (
        <div className="edit-form">
          <h4>Car</h4>
          <form>
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={currentCar.make}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={currentCar.model}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={currentCar.year}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={currentCar.year}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={currentCar.status}
                onChange={handleInputChange}
              />
            </div>

          </form>

          

          <button className="badge badge-danger mr-2" onClick={deleteCar}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCar}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Car...</p>
        </div>
      )}
    </div>
  );
};

export default Car;
