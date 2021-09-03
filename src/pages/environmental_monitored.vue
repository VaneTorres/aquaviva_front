<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top>
          <q-btn
            :disable="loading"
            round
            color="primary"
            icon="add"
            @click="newMonitoring = true"
          />
          <q-space />
          <q-input
            outlined
            dense
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-dialog v-model="newMonitoring">
        <NewMonitoring v-on:new="registerMonitoring"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewMonitoring from "src/components/NewMonitoring.vue";
const columns = [
  {
    name: "name",
    required: true,
    label: "PROYECTO",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tool",
    align: "center",
    label: "INSTRUMENTO AMBIENTAL",
    field: "tool",
    sortable: true,
  },
  {
    name: "authority",
    align: "center",
    label: "AUTORIDAD AMBIENTAL",
    field: "authority",
    sortable: true,
  },
  {
    name: "town",
    align: "center",
    label: "MUNICIPIO",
    field: "town",
    sortable: true,
  },
  {
    name: "especification",
    align: "center",
    label: "UBICACIÓN",
    field: "especification",
    sortable: true,
  },
];

const originalRows = [];

export default {
  components: {
    NewMonitoring,
  },
  data() {
    return {
      newMonitoring: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods:{
    registerMonitoring(info) {
      console.log(info);
      this.newMonitoring=false;
      this.rows.push({
            name: info.project,
            tool: info.tool,
            authority: info.authority,
            town: info.town,
            especification: info.especification,
          });
    },
  },
  
  created() {
    /* this.$axios
      .get("http://127.0.0.1:8000/api/company_list")
      .then((response) => {
        response.data.forEach((element) => {
          this.rows.push({
            name: element.nit,
            logo: element.logo,
            code_ciiu: element.ciiu,
            decription_ciiu: element.description,
            id: element.id_company,
          });
        });
        originalRows = this.rows;
      })
      .catch((e) => {
        console.log(e);
      }); */
  },
};
</script>

