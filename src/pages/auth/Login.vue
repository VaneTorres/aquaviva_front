<template>
  <q-page>
    <div class="contenedor absolute-center">
      <q-form
        id="formLogin"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="login"
      >
        <p>Bienvenido Aquaviva</p>
        <br />
        <q-input
          type="email"
          v-model="email"
          :rules="emailRules"
          placeholder="Correo electrónico"
        />
        <br />
        <q-input
          v-model="password"
          :rules="passwordRules"
          placeholder="Contraseña"
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
        <br />
        <q-btn type="submit" label="Entrar" form="formLogin" />
        <br />
        <a href="/forget">¿Olvidaste la contraseña?</a>
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
import { mapActions } from "vuex";
import "../../css/styleAuth.scss";
export default {
  name: "Login",
  data() {
    return {
      /*---------------------INICIAR LOS CAMPOS DEL FORMULARIO--------------------*/
      valid:true,
      password:null,
      email:null,
      isPwd:true,
      /*------------------------------------VALIDAR------------------------------*/
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es valido.",
      ],
      passwordRules: [(v) => !!v || "La contraseña es requerida."],
    };
  },
  methods: {
    ...mapActions({
            Storelogin: "parameters/userLogin"
         }),
    login: function (e) {
      const data = { email: this.email, password: this.password };
      this.Storelogin(data)
        .then((response) => {
          this.$store.commit('parameters/SET_TOKEN', response.data.token);
          this.$store.commit('parameters/SET_PERMISSIONS', response.data.permissions);
          this.$q.localStorage.set("TOKEN", response.data.token);
          this.$q.localStorage.set("PERMISSIONS", response.data.permissions);
          this.$q.localStorage.set("USER", response.data.id_user);
          window.location="/admin/dashboard";
        })
        .catch((e) => {
          // Capturamos los errores
          if (e.response.data.error == "invalid_credentials") {
            this.$q.notify({
              message:
                "Su correo electrónico o contraseña son incorrectos.",
              type: "negative",
            });
          } else {
            this.$q.notify({
              message: "Ocurrió un error, inténtelo más tarde.",
              type: "negative",
            });
          }
        });
    },
  },
};
</script>
