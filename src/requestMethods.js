import axios from "axios";
const BASE_URL = "https://coding-stats-server.onrender.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
