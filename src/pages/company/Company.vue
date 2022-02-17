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
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="secondary"
              icon-right="mdi-eye"
              no-caps
              flat
              dense
              @click="seeCompany(props.row.id)"
            >
              <q-tooltip>Ver detalles </q-tooltip>
            </q-btn>
            <q-btn
              color="info"
              icon-right="mdi-pencil-outline"
              no-caps
              flat
              dense
              @click="editCompany(props.row.id)"
            >
              <q-tooltip>Editar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <!-- Fin tabla de las compañias registradas -->
      <!-- Modal nueva compañia -->
      <q-dialog v-model="fixed">
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
        <EditCompany :id="id_company" @update="UpdateListCompany"/>
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
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code_ciiu",
    align: "center",
    label: "CÓDIGO CIIU ",
    field: "code_ciiu",
    sortable: true,
  },
  {
    name: "decription_ciiu",
    align: "center",
    label: "DESCRIPCION CIIU",
    field: "decription_ciiu",
    sortable: true,
  },
  { name: "action", label: "ACCIÓN", field: "action", align: "center" },
];

const originalRows = [];

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
      fixed: false,
      view: false,
      edit: false,
      id_company: null,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 20,
    };
  },
  methods: {
    ...mapActions({
      StoreGet: "parameters/GetAxios",
    }),
    /* Consulta la compañia */
    seeCompany(id) {
      this.id_company = id ;
      this.view = true;
    },
    /* Editar la compañia */
    editCompany(id) {
      this.id_company = id ;
      this.edit = true;
    },
    /* Cierra el modal de la compañia */
    UpdateListCompany() {
      this.fixed = false;
      this.edit = false;
      this.listCompany();
    },
    /* Tre la lista de las compañias creadas */
    listCompany() {
      this.rows = [];
      this.StoreGet({
        context: "http://127.0.0.1:8000/api/company_list",
      })
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
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.listCompany();
  },
};
</script>
