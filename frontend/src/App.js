import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddCar from "./components/AddCar";
import Car from "./components/Car";
import CarsList from "./components/CarList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/cars" className="navbar-brand">
          FFUN
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cars"} className="nav-link">
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Cars
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/cars"]} component={CarsList} />
          <Route exact path="/add" component={AddCar} />
          <Route path="/cars/:id" component={Car} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
