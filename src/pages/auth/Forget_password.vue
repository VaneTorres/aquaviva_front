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
        <p>Recuperar contraseña</p>
        <br />
        <q-input
          type="email"
          v-model="email"
          :rules="emailRules"
          placeholder="Correo electrónico"
        />
        <br />
        <q-btn type="submit" label="Enviar" form="formForget" />
        <br />
        <q-item clickable tag="a" to="/">
          <q-item-label>Iniciar sesión</q-item-label>
        </q-item>
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
  name: "Login",
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
    forget: function (e) {
      const data = { email: this.email, password };
    },
  },
});
</script>
