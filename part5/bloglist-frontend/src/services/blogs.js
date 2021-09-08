import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config;

const setToken = newToken => {
    token = `bearer ${newToken}`;
    config = {
        headers: {
            Authorization: token,
        },
    };
};

const getAll = () => {
    const response = axios.get(baseUrl);
    return response.then(response => response.data);
};

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    const response = axios.put(`${baseUrl}/${id}`, newObject);
    return response.then(response => response.data);
};

const remove = async blogObject => {
    const response = await axios.delete(`${baseUrl}/${blogObject}`, config);
    return response.data;
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