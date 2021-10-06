import axios from "axios";
import { LocalStorage, Notify } from "quasar";
import router from ".";
export function userLogin(credentials) {
  return axios.post("http://127.0.0.1:8000/api/login", credentials);
}
export function Users_by_Address(data) {
  return axios.post("http://127.0.0.1:8000/api/get_users_by_address", data);
}
export function autenticatedAxios(state, context, data) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
  return axios.post(context, data);
}
export function logout(state) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
  axios
    .get("http://127.0.0.1:8000/api/logout")
    .then((response) => {
      Notify.create({
        type: "positive",
        message: `Sesión cerrada`,
      });
      LocalStorage.clear();
      router.push({ path: "/" });
    })
    .catch((e) => {
      console.log(e);
    });
}
