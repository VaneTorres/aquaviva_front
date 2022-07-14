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
          >
            <q-tooltip>Nuevo proyecto ambiental</q-tooltip>
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
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="mdi-pencil-outline"
              no-caps
              flat
              dense
              @click="action(props.row.id, 'edit')"
              v-if="permissions.includes('Actualizar proyecto')"
            >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn
              color="negative"
              icon-right="mdi-delete-outline"
              no-caps
              flat
              dense
              @click="action(props.row.id, 'delete')"
              v-if="permissions.includes('Eliminar proyecto')"
            >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="fixed">
        <NewProject @editList="registerPrograms" />
      </q-dialog>
      <q-dialog v-model="editProject">
        <EditProject :id="id_project" @editList="registerPrograms" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* Componentes de ver y nuevo */
import NewProject from "src/components/parameterize/NewProject.vue";
import EditProject from "src/components/parameterize/EditProject.vue";
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
    EditProject,
  },
  data() {
    return {
      fixed: false,
      editProject: false,
      permissions: [],
      columns: columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
      id_project: null,
    };
  },
  methods: {
    ...mapActions({
      GetAxios: "parameters/GetAxios",
      StorePost: "parameters/PostAxios",
    }),
    action(id, action) {
      if (action === "edit") {
        this.id_project = id;
        this.editProject = true;
      } else if (action === "delete") {
        this.StorePost({
          context: `delete_project`,
          data: { id_project: id },
        }).then(() => {
          this.registerPrograms();
        });
      }
    },
    registerPrograms() {
      this.editProject = false;
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
  created() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.listPrograms();
    this.columns = columns;
    if (
      this.permissions.includes("Actualizar proyecto") ||
      this.permissions.includes("Eliminar proyecto")
    ) {
      columns[3] = {
        name: "action",
        label: "ACCION",
        field: "action",
        align: "center",
      };
    }
  },
};
</script>
