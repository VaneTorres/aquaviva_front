import axios from "axios";
export function userLogin(credentials) {
    return axios.post("http://127.0.0.1:8000/api/login", credentials);
};
export function Users_by_Address(data) {
    return axios.post("http://127.0.0.1:8000/api/get_users_by_address", data);
};

