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
            @click="newProgram = true"
            v-if="permissions.includes('Crear programa')"
          >
            <q-tooltip>Nuevo programa ambiental</q-tooltip>
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
              v-if="permissions.includes('Actualizar programa')"
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
              v-if="permissions.includes('Eliminar programa')"
            >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="newProgram">
        <NewProgram @editList="registerPrograms" />
      </q-dialog>
      <q-dialog v-model="editProgram">
        <EditProgram :id="id_program" @editList="registerPrograms" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* Componentes de ver y nuevo */
import NewProgram from "src/components/parameterize/NewProgram.vue";
import EditProgram from "src/components/parameterize/EditProgram.vue";
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
    label: "CÓDIGO",
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
    EditProgram,
  },
  data() {
    return {
      id_program: null,
      newProgram: false,
      editProgram: false,
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
      StorePost: "parameters/PostAxios",
    }),
    action(id, action) {
      if (action === "delete") {
        this.StorePost({
          context: `delete_program`,
          data: { id_program: id },
        }).then((response) => {
          this.listPrograms();
        });
      } else if (action === "edit") {
        this.id_program = id;
        this.editProgram = true;
      }
    },
    registerPrograms() {
      this.newProgram = false;
      this.editProgram = false;
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
  created() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.listPrograms();
    if (
      this.permissions.includes("Actualizar programa") ||
      this.permissions.includes("Eliminar programa")
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
