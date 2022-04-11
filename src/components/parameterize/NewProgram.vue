<template>
  <q-card style="width: 800px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR PROGRAMA</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formPrograms"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerPrograms"
      >
        <div class="row q-col-gutter-sm">
          <q-select
            use-input
            :rules="mediumsRule"
            input-debounce="0"
            @filter="filtermediums"
            v-model="mediums"
            :options="optionmediums"
            label="Medio *"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="code"
            :rules="codeRules"
            type="text"
            class="col-md-6 col-12"
            label="Código *"
          />
          <q-input
            autogrow
            v-model="name"
            :rules="nameRules"
            type="text"
            class="col-md-6 col-12"
            label="Nombre del programa *"
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
const stringmediumsOptions = [];
export default {
  data() {
    return {
      valid: true,
      //V-MODEL
      name: null,
      code: null,
      mediums: null,
      optionmediums: stringmediumsOptions,
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre del programa es requerido."],
      codeRules: [(v) => !!v || "El código del programa es requerido."],
      mediumsRule: [(v) => !!v || "El medio es requerido."],
    };
  },
  methods: {
    ...mapActions({
      GetMedium: "parameters/GetMedium",
      StorePost: "parameters/PostAxios",
    }),
    registerPrograms() {
      var data = {
        name: this.name,
        code: this.code,
        id_medium: this.mediums.id,
      };
      this.StorePost({
        context: "create_program",
        data: data,
      }).then(() => {
        this.$emit("new");
      });
    },
    //FILTRO DEL SELECT
    filtermediums(val, update) {
      if (val === "") {
        update(() => {
          this.optionmediums = stringmediumsOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionmediums = stringmediumsOptions[0].filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    this.GetMedium().then((response) => {
      stringmediumsOptions.push(response);
    });
  },
};
</script>
