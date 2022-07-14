<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
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
            v-if="permissions.includes('Crear monitoreo')"
          >
            <q-tooltip>Nuevo proyecto de la organización</q-tooltip>
          </q-btn>
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
        <NewMonitoring v-on:new="registerMonitoring" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewMonitoring from "src/components/NewMonitoring.vue";
import { mapActions } from "vuex";
const columns = [
  {
    name: "project",
    required: true,
    label: "PROYECTO DE LA ORGANIZACIÓN",
    align: "center",
    field: (row) => row.project,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "authority",
    align: "center",
    label: "AUTORIDAD AMBIENTAL",
    style:
      "max-width:5px; white-space: pre-wrap;  white-space: -moz-pre-wrap;  white-space: -pre-wrap;   white-space: -o-pre-wrap;  word-wrap: break-word; ",
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
      permissions: [],
      newMonitoring: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    ...mapActions({
      StoreGet: "parameters/GetAxios",
    }),
    registerMonitoring() {
      this.newMonitoring = false;
      this.UpdateList();
    },
    UpdateList() {
      this.loading = true;
      this.StoreGet({
        context: "get_projects",
      }).then((response) => {
        this.rows = response.data;
        this.loading = false;
      });
    },
  },

  created() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.UpdateList();
  },
};
</script>
