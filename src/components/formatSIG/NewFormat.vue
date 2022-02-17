<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR FORMATOS</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formAddress"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerAddress"
      >
        <div class="row q-col-gutter-md">
          <q-select
            use-input
            :rules="projectRule"
            input-debounce="0"
            @filter="filterProject"
            @change="CompnentMeduim"
            v-model="project"
            :options="options_project"
            label="Proyecto"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="environmentRule"
            input-debounce="0"
            @filter="filterEnvironment"
            v-model="environment"
            :options="options_environment"
            label="Código (Tipo de dato)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="mediumRule"
            input-debounce="0"
            @filter="filterMNedium"
            v-model="medium"
            :options="options_medium"
            label="Medio"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_component"
            label="Componente"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_format"
            label="Formato"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-btn
            flat
            dense
            color="primary"
            class="col-md-12 col-12 q-my-md"
            :disable="loading"
            label="Agregar"
            @click="addFormat"
          ></q-btn>
        </div>
        <div class="q-pt-md">
          <q-table :rows="rows" :columns="columns" row-key="name" />
        </div>
        <q-btn
          type="submit"
          label="Enviar"
          form="formAddress"
          class="q-my-sm"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringProjectOptions = [];
const stringMediumOptions = [];
const stringComponentOptions=[];
const columns = [
  {
    name: "nombre_sede",
    required: true,
    label: "PROYECTO",
    align: "center",
    field: (row) => row.nombre_sede,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "CÓDIGO",
    field: "address",
    sortable: true,
  },
  {
    name: "town",
    align: "center",
    label: "MEDIO",
    field: "town",
    sortable: true,
  },
  {
    name: "address_description",
    align: "center",
    label: "COMPONENETE",
    field: "address_description",
    sortable: true,
  },
  {
    name: "contact_person",
    align: "center",
    label: "FORMATO",
    field: "contact_person",
    sortable: true,
  },
];
export default {
  data() {
    return {
      columns,
      options_project: stringProjectOptions,
      options_medium: stringMediumOptions,
      options_component:stringComponentOptions,
      medium: null,
      project: null,
    };
  },
  methods: {
    filterProject(val, update) {
      update(() => {
        this.options_project = this.filter(
          val,
          this.options_project,
          stringProjectOptions
        );
      });
    },
    filter(val, options, stringOptions) {
      var options_data = options;
      if (val === "") {
        options_data = stringOptions;
      } else {
        const needle = val.toLowerCase();
        options_data = stringOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      }
      return options_data;
    },
    CompnentMeduim() {
      var data = {
        id_medium: medium.id,
      };
      this.$axios
        .post("http://127.0.0.1:8000/api/get_components_by_medium", data)
        .then((response) => {
          response.data.forEach((element) => {
            stringComponentOptions.push({
              label: element.project.toString(),
              value: element.project,
              id: element.id.toString(),
            });
          });
          this.options_component = stringComponentOptions;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_projects", data)
      .then((response) => {
        response.data.forEach((element) => {
          stringProjectOptions.push({
            label: element.project.toString(),
            value: element.project,
            id: element.id.toString(),
          });
        });
        this.options_project = stringProjectOptions;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("http://127.0.0.1:8000/api/get_mediums")
      .then((response) => {
        response.data.forEach((element) => {
          stringMediumOptions.push({
            label: element.medium.toString(),
            value: element.medium,
            id: element.id.toString(),
          });
        });
        this.options_medium = stringMediumOptions;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
