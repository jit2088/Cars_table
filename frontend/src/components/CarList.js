import React, { useState, useEffect, useMemo, useRef } from "react";
import CarDataService from "../services/CarService";
import { useTable } from "react-table";

const CarsList = (props) => {
  const [cars, setCars] = useState([]);
  const [searchCar, setSearchCar] = useState("");
  const carsRef = useRef();

  carsRef.current = cars;

  useEffect(() => {
    retrieveCars();
  }, []);

  const onChangeSearchCar = (e) => {
    const searchCar = e.target.value;
    setSearchCar(searchCar);
  };

  const retrieveCars = () => {
    CarDataService.getAll()
      .then((response) => {
        setCars(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCars();
  };

  const removeAllCars = () => {
    CarDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByCar = () => {
    CarDataService.findByCar(searchCar)
      .then((response) => {
        setCars(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openCar = (rowIndex) => {
    const id = carsRef.current[rowIndex].id;

    props.history.push("/cars/" + id);
  };

  const deleteCar = (rowIndex) => {
    const id = carsRef.current[rowIndex].id;

    CarDataService.remove(id)
      .then((response) => {
        props.history.push("/cars");

        let newCars = [...carsRef.current];
        newCars.splice(rowIndex, 1);

        setCars(newCars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Make",
        accessor: "make",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
        // Cell: (props) => {
        //   return props.value ? "Available" : "Sold";
        // },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCar(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteCar(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: cars,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by make"
            value={searchCar}
            onChange={onChangeSearchCar}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCar}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllCars}>
          Remove All
        </button>
      </div> */}
    </div>
  );
};

export default CarsList;
