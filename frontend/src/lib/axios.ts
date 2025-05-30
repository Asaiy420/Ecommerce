import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api"  ,
    withCredentials: true // send cookies to the server
});

export default axiosInstance; 