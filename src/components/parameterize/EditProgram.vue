<template>
  <q-card style="width: 800px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">EDITAR PROGRAMA AMBIENTAL</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formPrograms"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="EditPrograms"
      >
        <div class="row q-col-gutter-sm">
          <q-select
            use-input
            :rules="mediumsRule"
            input-debounce="0"
            v-model="data.medium"
            :options="optionmediums"
            label="Medio (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="data.code"
            :rules="codeRules"
            type="text"
            class="col-md-6 col-12"
            label="Código (*)"
          />
          <q-input
            autogrow
            v-model="data.name"
            :rules="nameRules"
            type="text"
            class="col-md-6 col-12"
            label="Nombre del programa (*)"
          />
        </div>
        <q-btn
          type="submit"
          color="primary"
          label="Enviar"
          form="formPrograms"
          class="q-my-md float-right"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      valid: true,
      //V-MODEL
      data: {},
      optionmediums: ["Abiótico", "Biótico", "Socioeconómico"],
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre del programa es requerido."],
      codeRules: [(v) => !!v || "El código del programa es requerido."],
      mediumsRule: [(v) => !!v || "El medio es requerido."],
    };
  },
  methods: {
    ...mapActions({
      StorePost: "parameters/PostAxios",
    }),
    EditPrograms() {
      this.StorePost({
        context: "update_program",
        data: this.data,
      }).then(() => {
        this.$emit("editList");
      });
    },
  },
  mounted() {
    this.StorePost({ context: "show_program", data: { id: this.id } }).then(
      (response) => {
        this.data = response.data.program;
      }
    );
  },
};
</script>
