import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_URL_BACKEND } = getEnvVariables();
const calendarApi = axios.create({
    baseURL: VITE_URL_BACKEND
})


//* Configuracion para dectectar token y establecerlo en la cabecera
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }

    return config;
})



export default calendarApi;