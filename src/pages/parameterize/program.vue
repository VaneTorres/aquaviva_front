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
            v-if="permissions.includes('Crear programa')"
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
        <NewProgram @new="registerPrograms" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* Componentes de ver y nuevo */
import NewProgram from "src/components/parameterize/NewProgram.vue";
import { mapActions } from "vuex";
/* Columnas de las tablas */
const columns = [
  {
    name: "medium",
    required: true,
    label: "MEDIO",
    align: "center",
    field: (row) => row.medium,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    align: "center",
    label: "CODIGO",
    field: "code",
    sortable: true,
  },
  {
    name: "label",
    align: "center",
    label: "NOMBRE",
    field: "label",
    sortable: true,
  },
];

const originalRows = [];

export default {
  components: {
    NewProgram,
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
      GetProgram: "parameters/GetProgram",
    }),
    registerPrograms() {
      this.fixed = false;
      this.listPrograms();
    },
    listPrograms() {
      this.loading = true;
      this.rows = [];
      this.GetProgram().then((response) => {
        this.rows = response;
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
