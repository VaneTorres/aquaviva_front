import axios from "axios";
export function userLogin(context, credentials) {
    return axios.post("http://127.0.0.1:8000/api/login", credentials);
};
