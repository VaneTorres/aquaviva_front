<template>
  <q-card style="max-width: 700px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR PROYECTO DE LA ORGANIZACIÓN</div>
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
        <div class="row q-col-gutter-sm">
          <q-select
            use-input
            :rules="addresRule"
            input-debounce="0"
            @filter="filterAddress"
            v-model="address"
            :options="options_address"
            label="Sede (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="project"
            :rules="projectNameRules"
            type="text"
            class="col-md-6 col-12"
            label="Proyecto de la organización (*)"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_town"
            label="Municipio (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="ubication"
            :rules="ubicationNameRules"
            type="text"
            class="col-md-6 col-12"
            label="Ubicación (*)"
          />
          <q-select
            use-input
            :rules="authorityRule"
            input-debounce="0"
            @filter="filterAuthority"
            v-model="authority"
            :options="options_authority"
            label="Autoridad ambiental (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <div class="col-md-12">
            <q-separator />
            <div class="text-subtitle1 text-center">
              Obligaciones Ambientales
            </div>
            <q-separator />
          </div>
          <div class="row">
            <q-checkbox
              :rules="toolRule"
              class="col-md-6 col-12 text-left"
              v-for="(item, index) in options_tools"
              :key="index"
              v-model="tool"
              :label="item.label"
              :val="item.id"
            />
          </div>
        </div>
        <q-btn
          class="q-my-md float-right"
          color="primary"
          type="submit"
          label="Enviar"
          form="formAddress"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
const stringAuthorityOptions = [];
const stringToolOptions = [];
const stringTownOptions = [];
const stringAddressOptions = [];
export default {
  data() {
    return {
      //MODEL-VALUE
      project: null,
      town: null,
      ubication: null,
      authority: null,
      address: null,
      tool: [],
      valid: true,
      options_authority: stringAuthorityOptions,
      options_tools: stringToolOptions,
      options_town: stringTownOptions,
      options_address: stringAddressOptions,
      //VALIDATE
      addresRule: [(v) => !!v || "La sede es requerida."],
      projectNameRules: [(v) => !!v || "El proyecto es requerido."],
      townRule: [(v) => !!v || "El municipio es requerido."],
      authorityRule: [(v) => !!v || "La autoridad ambiental es requerida."],
      toolRule: [(v) => !!v || "El instrumento ambiental es requerido."],
      ubicationNameRules: [
        (v) => !!v || "La especificación de la ubicación es requerida.",
      ],
    };
  },
  methods: {
    ...mapActions({
      GetTown: "parameters/GetTown",
      GetTool: "parameters/GetTool",
      GetAddress: "parameters/GetAddress",
      GetAxios: "parameters/GetAxios",
      StorePost: "parameters/PostAxios",
    }),
    registerEnviorenmentalMonitore() {
      var data = {
        project: this.project,
        id_town: this.town.id,
        especification: this.ubication,
        id_authority: this.authority.id,
        tools: this.tool,
        id_address: this.address.id,
      };
      this.StorePost({
        context: "store_project",
        data: data,
      }).then(() => {
        this.$emit("new");
      });
    },
    //FILTRO DEL SELECT
    filterAddress(val, update) {
      if (val === "") {
        update(() => {
          this.options_address = stringAddressOptions[0];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options_address = stringAddressOptions[0].filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterTown(val, update) {
      if (val === "") {
        update(() => {
          this.options_town = stringTownOptions[0];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options_town = stringTownOptions[0].filter(
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  created() {
    //CONSULTAR LOS MUNICIPIOS
    /* llenar select municipios */
    this.GetTown().then((response) => {
      stringTownOptions.push(response);
    });
    /* Fin llenar select municipios */
    /* llenar select sedes */
    this.GetAddress().then((response) => {
      stringAddressOptions.push(response);
    });
    /* Fin llenar select sedes */
    /* llenar select intrumento ambiental */
    this.GetTool().then((response) => {
      this.options_tools = response;
    });
    /* Fin llenar select intrumento ambiental */
    this.GetAxios({
      context: "get_authorities",
    }).then((response) => {
      stringAuthorityOptions.length = 0;
      response.data.forEach((element) => {
        this.options_authority.push({
          label: element.authority.toString(),
          id: element.id.toString(),
        });
      });
      this.options_authority = stringAuthorityOptions;
    });
  },
};
</script>
