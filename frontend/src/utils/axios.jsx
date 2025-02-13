
import axios from "axios";

const instance = axios.create({
    baseURL: "https://dashboard-app-lcty.onrender.com/api",
})

export default instance;