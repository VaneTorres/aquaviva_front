<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR FICHA PMA</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formAddress"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerEnviorenmentalMonitore"
      >
        <div class="row">
          <q-input
            v-model="project"
            :rules="projectNameRules"
            type="text"
            class="col-md-6 q-pa-sm"
            label="Actividad"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="optionsfrequency"
            label="Frecuencia"
            class="col-md-6 q-pa-sm"
            color="primary"
          />
          <q-input
            v-model="ubication"
            :rules="ubicationNameRules"
            type="text"
            class="col-md-6 q-pa-sm"
            label="Indicador"
          />
          <q-input
            v-model="ubication"
            :rules="ubicationNameRules"
            type="text"
            class="col-md-6 q-pa-sm"
            label="Objetivo"
          />
          <q-input
            v-model="ubication"
            :rules="ubicationNameRules"
            type="number"
            class="col-md-6 q-pa-sm"
            label="Presupuesto estimado"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_town"
            label="Cargo responsable"
            class="col-md-6 q-pa-sm"
            color="primary"
          />
        </div>
        <q-btn type="submit" label="Enviar" form="formAddress" />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringAuthorityOptions = [];
const stringToolOptions = [];
const stringTownOptions = [];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      //MODEL-VALUE
      project: null,
      town: null,
      ubication: null,
      authority: null,
      tool: null,
      valid: true,
      optionsfrequency: ["Variable", "Fija"],
      options_authority: stringAuthorityOptions,
      options_tools: stringToolOptions,
      options_town: stringTownOptions,
      //VALIDATE
      townRule: [(v) => !!v || "El municipio es requerido."],
      ubicationRule: [
        (v) => !!v || "La especificación de la ubicación es requerida.",
      ],
      addressNameRules: [(v) => !!v || "El nombre de la sede es requerida."],
      descriptionRules: [
        (v) => !!v || "La descripción de la sede es requerida.",
      ],
    };
  },
  methods: {
    registerEnviorenmentalMonitore() {
      var id_user = this.$q.localStorage.getItem("USER");
      var data = {
        id_user: id_user,
        project: this.project,
        id_town: this.town.id,
        town: this.town.label,
        especification: this.ubication,
        id_authority: this.authority.id,
        authority: this.authority.label,
        id_tool: this.tool.id,
        tool: this.tool.label,
      };
      this.$axios
        .post("http://127.0.0.1:8000/api/store_project", data)
        .then((response) => {
          this.$emit("new", data);
          this.$q.notify({
            message: "Se ha registrado correctamente.",
            type: "positive",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //FILTRO DEL SELECT
    filterTown(val, update) {
      if (val === "") {
        update(() => {
          this.options_town = stringTownOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_town = stringTownOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterAuthority(val, update) {
      if (val === "") {
        update(() => {
          this.options_authority = stringAuthorityOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_authority = stringAuthorityOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterTool(val, update) {
      if (val === "") {
        update(() => {
          this.options_tools = stringToolOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_tools = stringToolOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    //REGISTRO DE SELECT
    registerAddress() {
      var data = {
        id_company: this.id_company,
        addressName: this.addressName,
        address: this.address,
        phone: this.phone,
        contact: this.contact,
        description: this.description,
        town: this.town.id,
        town_name: this.town.label,
        type_address: "Secundaria",
      };

      this.$axios
        .post("http://127.0.0.1:8000/api/store_address", data)
        .then((response) => {
          this.$emit("new", data);
          this.$q.notify({
            message: "Se ha registrado correctamente.",
            type: "positive",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    //CONSULTAR LOS MUNICIPIOS
    this.$axios
      .get("http://127.0.0.1:8000/api/get_towns")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_town.push({
            label: element.town.toString(),
            value: element.town,
            id: element.id.toString(),
          });
        });
        stringTownOptions = this.options_town;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("http://127.0.0.1:8000/api/get_tools")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_tools.push({
            label: element.tool.toString(),
            value: element.tool,
            id: element.id.toString(),
          });
        });
        stringToolOptions = this.options_tools;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("http://127.0.0.1:8000/api/get_authorities")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_authority.push({
            label: element.authority.toString(),
            value: element.authority,
            id: element.id.toString(),
          });
        });
        stringAuthorityOptions = this.options_authority;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
