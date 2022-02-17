<template>
  <q-page>
    <div class="contenedor absolute-center">
      <q-form
        id="formForget"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="forget"
      >
        <p>Recuperar la contraseña</p>
        <div class="q-col-gutter-md">
          <q-input
            type="email"
            v-model="email"
            :rules="emailRules"
            placeholder="Correo electrónico"
          />

          <q-input
            v-model="new_password"
            :rules="NewpasswordRules"
            placeholder="Nueva contraseña"
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

          <q-input
            v-model="confirm_password"
            :rules="passwordRules"
            placeholder="Repetir contraseña"
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

          <q-btn type="submit" label="Enviar" form="formForget" />
          <q-item clickable tag="a" to="/">
            <q-item-label>Iniciar sesión</q-item-label>
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
</template>

<script>
import { defineComponent } from "vue";
import "../../css/styleAuth.scss";
export default defineComponent({
  name: "Reset_password",
  data() {
    return {
      /*---------------------INICIAR LOS CAMPOS DEL FORMULARIO--------------------*/
      valid: true,
      confirm_password: null,
      new_password: null,
      email: "",
      isPwd: true,
      /*------------------------------------VALIDAR------------------------------*/
      NewpasswordRules: [
        (v) => !!v || "La contraseña es requerida.",
        (v) =>
          v.length > 6 || "La contraseña debe tener al menos 6 caracteres.",
        (v) => /\d/.test(v) || "La contraseña debe tener al menos un número.",
        (v) =>
          /[A-Z]+/.test(v) ||
          "La contraseña debe tener al menos una mayúscula.",
        (v) =>
          /[a-z]+/.test(v) ||
          "La contraseña debe tener al menos una minúscula.",
      ],
      passwordRules: [
        (v) => !!v || "La contraseña es requerida.",
        (v) => v === this.new_password || "Las contraseñas no coinciden",
      ],
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
    forget: function (e) {
      var token = this.$route.params.token;
      const data = {
        password: this.new_password,
        password_confirmation: this.confirm_password,
        token: token,
        email: this.email,
      };
      this.$axios
        .post("http://127.0.0.1:8000/api/password/reset", data)
        .then((response) => {
          if (response.data.code == 201) {
            this.$q.notify({
              message: response.data.message,
              type: "positive",
            });
          } else {
            this.$q.notify({
              message: response.data.message,
              type: "negative",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
</script>
