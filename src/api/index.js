import axios from 'axios';

var port = process.env.PORT || 8080;

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`,
  responseType: "json"
});