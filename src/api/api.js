import axios from "axios";
import { baseUrls } from "./const";
const api = axios.create({
    baseURL: baseUrls,
});
console.log(localStorage.getItem("user"));
if (localStorage.getItem("user")) {
    api.interceptors.request.use((request) => {
        console.log(localStorage.getItem('user'));
        request.headers.Authorization = `Bearer ${localStorage.getItem("user")}`
        return request
    })
}

export default api
