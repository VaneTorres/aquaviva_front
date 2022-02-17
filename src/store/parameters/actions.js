import axios from "axios";
import { LocalStorage, Notify } from "quasar";
export function userLogin(credentials) {
  return axios.post("http://127.0.0.1:8000/api/login", credentials);
}
export function GetAxios(state, { context }) {
  return new Promise((resolve) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(context)
      .then((response) => {
        return resolve(response);
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }

        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
      });
  });
}
export function PostAxios(state, { context, data, headers }) {
  return new Promise((resolve,reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .post(context, data, { headers: headers })
      .then((response) => {
      
          if (response.data.message) {
            Notify.create({
              message: response.data.message,
              type: "positive",
            });
        }
        return resolve(response);
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
        return reject(e.response)
      });
  });
}
export function GetTown(state) {
  return new Promise((resolve) => {
    var town = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get("http://127.0.0.1:8000/api/get_towns")
      .then((response) => {
        response.data.forEach((element) => {
          town.push({
            label: element.town.toString(),
            value: element.town,
            id: element.id.toString(),
          });
          return resolve(town);
        });
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
      });
  });
}
export function GetTool(state) {
  return new Promise((resolve) => {
    var tool = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get("http://127.0.0.1:8000/api/get_tools")
      .then((response) => {
        response.data.forEach((element) => {
          tool.push({
            label: element.tool.toString(),
            value: element.tool,
            id: element.id.toString(),
          });
          return resolve(tool);
        });
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
      });
  });
}
export function GetCiiu(state) {
  return new Promise((resolve) => {
    var ciiu = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get("http://127.0.0.1:8000/api/get_ciiu")
      .then((response) => {
        response.data.forEach((element) => {
          ciiu.push({
            label: element.ciiu.toString(),
            value: element.ciiu.toString(),
            id: element.id.toString(),
            description: element.description.toString(),
          });
          return resolve(ciiu);
        });
      })
      .catch((e) => {
        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
      });
  });
}
export function GetDocumentTypes(state) {
  return new Promise((resolve) => {
    var type_document = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get("http://127.0.0.1:8000/api/get_document_types")
      .then((response) => {
        response.data.forEach((element) => {
          type_document.push({
            label: element.type,
            value: element.type,
            id: element.id,
          });
          return resolve(type_document);
        });
      })
      .catch((e) => {
        if (e.response.data.code == 401) {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        }
      });
  });
}
export function logout(state) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + state.getters["authenticated"];
  axios
    .get("http://127.0.0.1:8000/api/logout")
    .then((response) => {
      Notify.create({
        type: "positive",
        message: `Sesión cerrada`,
      });
      LocalStorage.clear();
      this.$router.push({ path: "/" });
    })
    .catch((e) => {
      console.log(e);
    });
}
