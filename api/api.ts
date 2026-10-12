import axios from "axios";

const api = axios.create({
  baseURL: "/api/readme",
});

export default api;