import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const remove = async blogObject => {
  const config = { headers: { Authorization: token } };
  console.log('id ', blogObject.id);
  console.log('auth token ', config.headers.Authorization);
  const request = await axios.delete(`${baseUrl}/${blogObject.id}`, config);
  return request.then(response => response.data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAll,
  token,
  setToken,
  create,
  update,
  remove,
};
