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
            @click="fixed = true"
            v-if="permissions.includes('Crear proyecto')"
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
        <NewProject @new="registerPrograms" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* Componentes de ver y nuevo */
import NewProject from "src/components/parameterize/NewProject.vue";
import { mapActions } from "vuex";
/* Columnas de las tablas */
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
    name: "program_name",
    align: "center",
    label: "PROGRAMA",
    field: "program_name",
    sortable: true,
  },
];

const originalRows = [];

export default {
  components: {
    NewProject,
  },
  data() {
    return {
      fixed: false,
      permissions: [],
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    ...mapActions({
      GetAxios: "parameters/GetAxios",
    }),
    registerPrograms() {
      this.fixed = false;
      this.listPrograms();
    },
    listPrograms() {
      this.loading = true;
      this.rows = [];
      this.GetAxios({
        context: "get_projects_by_company",
      }).then((response) => {
        this.rows = response.data.projects;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.listPrograms();
  },
};
</script>
