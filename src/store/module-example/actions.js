/* import { api } from 'boot/axios'

export function autenticated ({ commit },context, data) {
  return api.post(context, form)
    .then(response => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      commit('login', {token: response.data.token, user: response.data.user})
    })
} */
import axios from "src/boot/axios";
export function userLogin(context, credentials) {
    return  axios.post("auth/pwa-login", credentials);
}
export function autenticated(context, data) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + state;
    return  axios.post(context, data);
}
