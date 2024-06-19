import axios from "axios";


const localhost = 'http://localhost:3000'


const axiosInstance = axios.create({
    baseURL: localhost
})

export default axiosInstance
