<template>
  <q-card style="width: 800px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">EDITAR PROYECTO AMBIENTAL</div>
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
            :rules="programsRule"
            input-debounce="0"
            @filter="filterprograms"
            v-model="programs"
            :options="optionprograms"
            label="Programas (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="name"
            :rules="nameRules"
            type="text"
            class="col-md-6 col-12"
            label="Nombre del proyecto (*)"
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
var stringprogramsOptions = [];
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      valid: true,
      //V-MODEL
      name: null,
      code: null,
      programs: null,
      optionprograms: stringprogramsOptions,
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre del proyecto es requerido."],
      programsRule: [(v) => !!v || "El programa es requerido."],
    };
  },
  methods: {
    ...mapActions({
      GetProgram: "parameters/GetProgram",
      StorePost: "parameters/PostAxios",
    }),
    registerPrograms() {
      var data = {
        id: this.id,
        name: this.name,
        id_program: this.programs.id,
      };
      this.StorePost({
        context: "update_project",
        data: data,
      }).then(() => {
        this.$emit("editList");
      });
    },
    //FILTRO DEL SELECT
    filterprograms(val, update) {
      if (val === "") {
        update(() => {
          this.optionprograms = stringprogramsOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionprograms = stringprogramsOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  created() {
    this.GetProgram().then((response) => {
      stringprogramsOptions = response;
    });
    this.StorePost({ context: "show_project", data: { id: this.id } }).then(
      (response) => {
        this.name = response.data.project.project;
        this.programs = {
          id: response.data.project.id_programs,
          label: response.data.project.program,
          code: response.data.project.code,
          medium: response.data.project.medium,
        };
      }
    );
  },
};
</script>
