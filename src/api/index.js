import axios from 'axios';

export const api = axios.create({
  baseURL: `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1`,
  responseType: "json"
});