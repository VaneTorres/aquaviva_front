<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="contenedor absolute">
          <q-form
            id="formForget"
            v-model="valid"
            lazy-validation
            class="text-center"
            @submit.prevent="forget"
          >
            <p>Recuperar la contraseña</p>
            <br />
            <q-input
              type="email"
              v-model="email"
              :rules="emailRules"
              placeholder="Correo electrónico"
            />
            <!-- BOTONES -->
            <br />
            <q-btn type="submit" label="Enviar" form="formForget" />
            <br />
            <q-item clickable tag="a" to="/">
              <q-item-label>Iniciar sesión</q-item-label>
            </q-item>
            <!-- FIN BOTONES -->
          </q-form>
          <!-- DECORACIÓN -->
          <div class="drops">
            <div class="drop drop-1"></div>
            <div class="drop drop-2"></div>
            <div class="drop drop-3"></div>
            <div class="drop drop-4"></div>
            <div class="drop drop-5"></div>
          </div>
          <!-- FIN DECORACIÓN -->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerFacebook } from "quasar";
import "../../css/styleAuth.scss";
export default {
  name: "Forget",
  data() {
    return {
      /*---------------------INICIAR LOS CAMPOS DEL FORMULARIO--------------------*/
      valid: true,
      email: "",
      /*------------------------------------VALIDAR------------------------------*/
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es válido.",
      ],
    };
  },
  methods: {
    forget() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "black",
        spinnerSize: 140,
        backgroundColor: "green",
        message: "Estamos validando sus credenciales",
        messageColor: "black",
      });
      this.$axios
        .post(
          this.$store.getters["parameters/URL_PRODUCTION"] + "password/email",
          { email: this.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.$q.loading.hide();
          /* EL CORREO DE RECUPERACIÓN SE ENVIO */
          if (response.data.success) {
            this.$q.notify({
              message: "El link de recuperación de contraseña fue enviado.",
              type: "positive",
            });
          } else {
            /* EL CORREO NO EXISTE */
            this.$q.notify({
              message: "El correo electrónico es incorrecto.",
              type: "negative",
            });
          }
        })
        .catch((e) => {
          /* ERROR EN CONSULTA */
          this.$q.notify({
            message:
              "No se pudo conectar. Por favor, vuelva a intentarlo más tarde.",
            type: "negative",
          });
        });
    },
  },
};
</script>
