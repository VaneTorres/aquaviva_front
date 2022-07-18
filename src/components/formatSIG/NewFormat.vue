<template>
  <q-card style="max-width: 700px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR FORMATOS</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formFormat"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="addFormat"
      >
        <div class="row q-col-gutter-md">
          <q-select
            use-input
            :rules="projectRule"
            input-debounce="0"
            @filter="filterProject"
            option-value="id"
            option-label="project"
            v-model="project"
            :options="options_project"
            label="Proyecto de la organización (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="codeRule"
            input-debounce="0"
            v-model="code"
            @update:model-value="(v) => MeduimByType(v)"
            :options="optionsCode"
            label="Código (Tipo de dato) (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="mediumRule"
            input-debounce="0"
            @filter="filterMedium"
            option-value="id"
            option-label="medium"
            @update:model-value="(v) => ComponentByMeduim(v)"
            v-model="medium"
            :options="options_medium"
            label="Medio (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="componentRule"
            input-debounce="0"
            @filter="filterComponent"
            v-model="component"
            option-value="id"
            option-label="component"
            @update:model-value="(v) => FormatByComponent(v)"
            :options="options_component"
            label="Componente (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="formatRule"
            input-debounce="0"
            @filter="filterFormat"
            option-value="id"
            option-label="format"
            v-model="format"
            :options="options_format"
            label="Formato (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-btn
            type="submit"
            flat
            dense
            color="primary"
            class="col-md-12 col-12 q-my-md"
            form="formFormat"
            label="Agregar"
            @click="addFormat"
          ></q-btn>
        </div>
        <div class="q-pt-md">
          <q-table :rows="rows" :columns="columns" row-key="name" />
        </div>
        <q-btn
          color="primary"
          label="Enviar"
          class="q-my-md float-right"
          @click="submitFormat"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";

var stringProjectOptions = [];
var stringMediumOptions = [];
var stringComponentOptions = [];
var stringFormatOptions = [];
const columns = [
  {
    name: "project",
    required: true,
    label: "PROYECTO",
    align: "center",
    field: (row) => row.project,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    align: "center",
    label: "CÓDIGO",
    field: "code",
    sortable: true,
  },
  {
    name: "medium",
    align: "center",
    label: "MEDIO",
    field: "medium",
    sortable: true,
  },
  {
    name: "component",
    align: "center",
    label: "COMPONENTE",
    field: "component",
    sortable: true,
  },
  {
    name: "format",
    align: "center",
    label: "FORMATO",
    field: "format",
    sortable: true,
  },
];
export default {
  data() {
    return {
      columns,
      options_project: stringProjectOptions,
      options_medium: stringMediumOptions,
      options_format: stringFormatOptions,
      options_component: stringComponentOptions,
      optionsCode: ["t", "v"],
      rows: [],
      code: null,
      project: null,
      component: null,
      format: null,
      medium: null,
      valid: true,
      projectRule: [(v) => !!v || "Seleccione un proyecto"],
      codeRule: [(v) => !!v || "Seleccione un tipo de dato"],
      mediumRule: [(v) => !!v || "Seleccione un medio"],
      componentRule: [(v) => !!v || "Seleccione un componente"],
      formatRule: [(v) => !!v || "Seleccione un formato"],
    };
  },
  methods: {
    ...mapActions({
      GetProgram: "parameters/GetProgram",
      GetAxios: "parameters/GetAxios",
      StorePost: "parameters/PostAxios",
    }),
    filterProject(val, update) {
      if (val === "") {
        update(() => {
          this.options_project = stringProjectOptions;
        });
        return;
      }
      update(() => {
        this.options_project = this.filter(
          val,
          this.options_project,
          stringProjectOptions
        );
      });
    },
    filterMedium(val, update) {
      if (val === "") {
        setTimeout(() => {
          update(() => {
            this.options_medium = stringMediumOptions;
          });
        }, 1000);
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_medium = stringMediumOptions.filter(
          (v) => v.medium.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterComponent(val, update) {
      if (val === "") {
        setTimeout(() => {
          update(() => {
            this.options_component = stringComponentOptions;
          });
        }, 1000);
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_component = stringComponentOptions.filter(
          (v) => v.component.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterFormat(val, update) {
      if (val === "") {
        setTimeout(() => {
          update(() => {
            this.options_format = stringFormatOptions;
          });
        }, 1000);
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_format = stringFormatOptions.filter(
          (v) => v.format.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    MeduimByType(type) {
      this.StorePost({
        context: "get_mediums",
        data: {
          type: type,
        },
      }).then((response) => {
        stringMediumOptions = response.data;
      });
    },
    ComponentByMeduim(idMedium) {
      this.StorePost({
        context: "get_components_by_medium",
        data: {
          id_medium: idMedium.id,
        },
      }).then((response) => {
        stringComponentOptions = response.data;
      });
    },
    FormatByComponent(idComponent) {
      this.StorePost({
        context: "get_formats_by_component",
        data: {
          id_component: idComponent.id,
        },
      }).then((response) => {
        stringFormatOptions = response.data;
      });
    },
    addFormat() {
      this.rows.push({
        project: this.project.project,
        id_project: this.project.id,
        id_format: this.format.id,
        code: this.code,
        format: this.format.format,
        component: this.component.component,
        medium: this.medium.medium,
      });
      this.project = null;
      this.code = null;
      this.format = null;
      this.component = null;
      this.medium = null;
    },
    submitFormat() {
      this.StorePost({
        context: "create_formats_excel",
        data: {
          excels: this.rows,
        },
      }).then(() => {
        this.$emit("editList");
      });
    },
  },
  mounted() {
    this.GetAxios({
      context: "get_projects",
    }).then((response) => {
      stringProjectOptions = response.data;
    });
  },
};
</script>
