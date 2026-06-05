import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://kplt.test/",
  baseURL: "https://api.kopalet.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
