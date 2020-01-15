import axios from 'axios';

var port = process.env.PORT || 8080;

export const api = axios.create({
  baseURL: `https://eurevendedor.herokuapp.com/api`,
  responseType: "json"
});