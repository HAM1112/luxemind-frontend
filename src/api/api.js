import axios from "axios";
import { baseUrls } from "./const";
const api = axios.create({
    baseURL: baseUrls,
});

export default api
