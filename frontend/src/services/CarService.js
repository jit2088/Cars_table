import http from "../http-common";

const getAll = () => {
  return http.get("/cars");
};

const get = (id) => {
  return http.get(`/cars/${id}`);
};

const create = (data) => {
  return http.post("/cars", data);
};

const update = (id, data) => {
  return http.put(`/cars/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/cars/${id}`);
};

const removeAll = () => {
  return http.delete(`/cars`);
};

const findByMake = (make) => {
  return http.get(`/cars?make=${make}`);
};

const CarService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByMake,
};

export default CarService;
