import axios from "axios";

const api = (token = null) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
    headers: { 
      Accept: '*',
      Authorization: `Bearer ${token}` || null
     },
  });
};

export const uploadApi = (token = null) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
    headers: { Authorization: `Bearer ${token}` || null },
  });
};

export default api;
