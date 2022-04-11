<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Tabla de las compañias registradas -->
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
            @click="newCompany = true"
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
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="secondary"
              icon-right="mdi-eye"
              no-caps
              flat
              dense
              @click="modalCompany(props.row.id_company, 'view')"
            >
              <q-tooltip>Ver detalles </q-tooltip>
            </q-btn>
            <q-btn
              color="info"
              icon-right="mdi-pencil-outline"
              no-caps
              flat
              dense
              @click="modalCompany(props.row.id_company, 'edit')"
            >
              <q-tooltip>Editar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <!-- Fin tabla de las compañias registradas -->
      <!-- Modal nueva compañia -->
      <q-dialog v-model="newCompany">
        <NewCompany @new="UpdateListCompany" />
      </q-dialog>
      <!-- Fin modal nueva compañia -->
      <!-- Modal ver compañia -->
      <q-dialog v-model="view">
        <ViewCompany :id="id_company" />
      </q-dialog>
      <!-- Fin modal ver compañia -->
      <!-- Modal edit compañia -->
      <q-dialog v-model="edit">
        <EditCompany :id="id_company" @update="UpdateListCompany" />
      </q-dialog>
      <!-- Fin modal edit compañia -->
    </div>
  </q-page>
</template>

<script>
/* Importar componentes */
import NewCompany from "src/components/Company/NewCompany.vue";
import ViewCompany from "src/components/Company/ViewCompany.vue";
import EditCompany from "src/components/Company/EditCompany.vue";
import { mapActions } from "vuex";

/* Datos de la tabla */
const columns = [
  {
    name: "nit",
    required: true,
    label: "NIT",
    align: "center",
    field: (row) => row.nit,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "ciiu",
    align: "center",
    label: "CÓDIGO CIIU ",
    field: "ciiu",
    sortable: true,
  },
  {
    name: "description",
    align: "center",
    label: "DESCRIPCION CIIU",
    style:
      "max-width:5px; white-space: pre-wrap;  white-space: -moz-pre-wrap;  white-space: -pre-wrap;   white-space: -o-pre-wrap;  word-wrap: break-word; ",
    field: "description",
    sortable: true,
  },
  { name: "action", label: "ACCIÓN", field: "action", align: "center" },
];

export default {
  /* Componentes */
  components: {
    NewCompany,
    ViewCompany,
    EditCompany,
  },

  /* Datos */
  data() {
    return {
      newCompany: false,
      view: false,
      edit: false,
      id_company: null,
      columns,
      rows: [],
      loading: false,
      filter: "",
      rowCount: 20,
    };
  },
  methods: {
    /* Vuex */
    ...mapActions({
      StoreGet: "parameters/GetAxios",
    }),
    /* Modal de ver o editar de la compañia */
    modalCompany(id, action) {
      this.id_company = id;
      action == "view" ? (this.view = true) : (this.edit = true);
    },
    /* Cierra el modal de la compañia */
    UpdateListCompany() {
      this.newCompany = false;
      this.edit = false;
      this.listCompany();
    },
    /* Tre la lista de las compañias creadas */
    listCompany() {
      this.rows = [];
      this.loading = true;
      this.StoreGet({
        context: "company_list",
      }).then((response) => {
        this.loading = false;
        this.rows = response.data;
      });
    },
  },
  created() {
    this.listCompany();
  },
};
</script>
