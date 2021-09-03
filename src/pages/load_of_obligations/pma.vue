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
            @click="fixed = true"
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
      <q-dialog v-model="fixed">
        <Newpma />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import Newpma from "src/components/load_of_obligations/Newpma.vue";
const columns = [
  {
    name: "pma",
    required: true,
    label: "NOMBRE DE LA FICHA",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "activity",
    align: "center",
    label: "ACTIVIDAD",
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
    name: "decription_ciiu",
    align: "center",
    label: "MUNICIPIO",
    field: "decription_ciiu",
    sortable: true,
  },
  {
    name: "decription_ciiu",
    align: "center",
    label: "UBICACIÓN",
    field: "decription_ciiu",
    sortable: true,
  },
];

const originalRows = [];

export default {
  components: {
    Newpma,
  },
  data() {
    return {
      fixed: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
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
