<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center q-pt-xl">
        <div class="contenedor absolute">
          <q-form
            id="formLogin"
            v-model="valid"
            lazy-validation
            class="text-center"
            @submit.prevent="login"
          >
            <p>Bienvenido HGOA Aquaviva</p>
            <div class="q-col-gutter-md">
              <q-input
                type="email"
                v-model="email"
                :rules="emailRules"
                placeholder="Correo electrónico"
              />
              <q-input
                v-model="password"
                :rules="passwordRules"
                placeholder="Contraseña"
                autocomplete="on"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-btn type="submit" label="Entrar" form="formLogin" />
              <q-item clickable tag="a" to="/forget">
                <q-item-label>¿Olvidaste la contraseña?</q-item-label>
              </q-item>
            </div>
          </q-form>
          <div class="drops">
            <div class="drop drop-1"></div>
            <div class="drop drop-2"></div>
            <div class="drop drop-3"></div>
            <div class="drop drop-4"></div>
            <div class="drop drop-5"></div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import "../../css/styleAuth.scss";
import { QSpinnerFacebook } from "quasar";
export default {
  name: "Login",
  data() {
    return {
      /*---------------------INICIAR LOS CAMPOS DEL FORMULARIO--------------------*/
      valid: true,
      password: null,
      email: null,
      isPwd: true,
      /*------------------------------------VALIDAR------------------------------*/
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es válido.",
      ],
      passwordRules: [(v) => !!v || "La contraseña es requerida."],
    };
  },
  methods: {
    login() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "black",
        spinnerSize: 140,
        backgroundColor: "green",
        message: "",
        messageColor: "black",
      });
      const data = { email: this.email, password: this.password };
      this.$axios
        .post(this.$store.getters["parameters/URL_PRODUCTION"] + "login", data)
        .then((response) => {
          this.$store.commit("parameters/SET_TOKEN", response.data.token);
          this.$store.commit(
            "parameters/SET_PERMISSIONS",
            response.data.permissions
          );
          this.$q.localStorage.set("TOKEN", response.data.token);
          this.$q.localStorage.set("PERMISSIONS", response.data.permissions);
          this.$q.localStorage.set("NAME_USER", response.data.user_name);
          this.$q.loading.hide();
          window.location = "/admin/dashboard";
        })
        .catch((e) => {
          this.$q.loading.hide();
          // Capturamos los errores
          if (e.response.data.error == "invalid_credentials") {
            this.$q.notify({
              message: "Su correo electrónico o contraseña son incorrectos.",
              type: "negative",
            });
          } else {
            this.$q.loading.hide();
            /* ERROR EN CONSULTA */
            this.$q.notify({
              message:
                "No se pudo conectar. Por favor, vuelva a intentarlo más tarde.",
              type: "negative",
            });
          }
        });
    },
  },
};
</script>
