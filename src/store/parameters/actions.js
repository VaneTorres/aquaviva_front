import axios from "axios";
import { LocalStorage, Notify } from "quasar";
export function GetAxios(state, { context }) {
  return new Promise((resolve) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(state.getters["URL_PRODUCTION"] + context)
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          return resolve(response);
        }
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
      });
  });
}
export function PostAxios(state, { context, data, headers }) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .post(state.getters["URL_PRODUCTION"] + context, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          if (response.data.message) {
            Notify.create({
              message: response.data.message,
              type: "positive",
            });
          }
          return resolve(response);
        }
      })
      .catch((e) => {
        if (e.response.status == 402) {
          Notify.create({
            message: e.response.data.error,
            type: "warning",
          });
        }
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
      });
  });
}
export function GetTown(state) {
  return new Promise((resolve) => {
    var town = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(state.getters["URL_PRODUCTION"] + "get_towns")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.forEach((element) => {
            town.push({
              label: element.town.toString(),
              value: element.town,
              id: element.id.toString(),
            });
            return resolve(town);
          });
        }
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
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
      .get(state.getters["URL_PRODUCTION"] + "get_tools")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.forEach((element) => {
            tool.push({
              label: element.tool.toString(),
              id: element.id.toString(),
            });
            return resolve(tool);
          });
        }
      })
      .catch((e) => {
        if (e.response.status == 403) {
          Notify.create({
            message: e.response.data.error,
            type: "negative",
          });
          this.$router.push({ name: "ErrorPermission" });
        }
      });
  });
}
export function GetCiiu(state) {
  return new Promise((resolve) => {
    var ciiu = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios.get(state.getters["URL_PRODUCTION"] + "get_ciiu").then((response) => {
      if (response.data.status == "Token is Expired") {
        Notify.create({
          type: "negative",
          message: `Sesión caducada.`,
        });
        LocalStorage.clear();
        this.$router.push({ path: "/" });
      } else {
        response.data.forEach((element) => {
          ciiu.push({
            label: element.ciiu.toString(),
            id: element.id.toString(),
            description: element.description.toString(),
          });
          return resolve(ciiu);
        });
      }
    });
  });
}
export function GetProgram(state) {
  return new Promise((resolve) => {
    var program = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(state.getters["URL_PRODUCTION"] + "list_programs")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.programs.forEach((element) => {
            program.push({
              label: element.name,
              id: element.id,
              medium: element.medium,
              code: element.code,
            });
          });
          return resolve(program);
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
      .get(state.getters["URL_PRODUCTION"] + "get_document_types")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.forEach((element) => {
            type_document.push({
              label: element.type,
              id: element.id,
            });
          });
          return resolve(type_document);
        }
      });
  });
}
export function GetAddress(state) {
  return new Promise((resolve) => {
    var address = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(state.getters["URL_PRODUCTION"] + "get_address_by_users")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.address.forEach((element) => {
            address.push({
              label: element.name,
              id: element.id_address,
            });
          });
          return resolve(address);
        }
      });
  });
}
export function GetMedium(state) {
  return new Promise((resolve) => {
    var medium = [];
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + state.getters["authenticated"];
    axios
      .get(state.getters["URL_PRODUCTION"] + "get_mediums")
      .then((response) => {
        if (response.data.status == "Token is Expired") {
          Notify.create({
            type: "negative",
            message: `Sesión caducada.`,
          });
          LocalStorage.clear();
          this.$router.push({ path: "/" });
        } else {
          response.data.forEach((element) => {
            medium.push({
              label: element.medium,
              value: element.medium,
              id: element.id,
            });
          });
          return resolve(medium);
        }
      });
  });
}
export function logout(state) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + state.getters["authenticated"];
  axios.get(state.getters["URL_PRODUCTION"] + "logout").then((response) => {
    if (response.data.status == "Token is Expired") {
      Notify.create({
        type: "negative",
        message: `Sesión caducada.`,
      });
      LocalStorage.clear();
      this.$router.push({ path: "/" });
    } else {
      Notify.create({
        type: "positive",
        message: `Sesión cerrada.`,
      });
      LocalStorage.clear();
      this.$router.push({ path: "/" });
    }
  });
}
