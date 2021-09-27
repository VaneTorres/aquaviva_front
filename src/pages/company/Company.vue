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
              @click="seeval(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
      <!-- Fin tabla de las compañias registradas -->
      <!-- Modal nueva compañia -->
      <q-dialog v-model="fixed">
        <NewCompany @new="registerCompany" />
      </q-dialog>
      <!-- Fin modal nueva compañia -->
      <!-- Modal ver compañia -->
      <q-dialog v-model="view">
        <ViewCompany :data="data" />
      </q-dialog>
      <!-- Fin modal ver compañia -->
    </div>
  </q-page>
</template>

<script>
/* Importar componentes */
import NewCompany from "src/components/Company/NewCompany.vue";
import ViewCompany from "src/components/Company/ViewCompany.vue";
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
  { name: "action", label: "ACCION", field: "action", align: "center" },
];

const originalRows = [];

export default {
  /* Componentes */
  components: {
    NewCompany,
    ViewCompany,
  },
  /* Datos */
  data() {
    return {
      fixed: false,
      view: false,
      data: [],
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 20,
    };
  },
  methods: {
    /* Consulta la compañia */
    seeval(id) {
      const data = { id_company: id };
      this.$axios
        .post("http://127.0.0.1:8000/api/company_show", data)
        .then((response) => {
          this.view = true;
          this.data = [];
          response.data.forEach((element) => {
            this.data.push({
              nit: element.nombre_sede,
              ciiu: element.ciiu,
              ciiu_description: element.ciiu_description,
              nombre_sede: element.nombre_sede,
              address: element.address,
              town: element.town,
              address_description: element.address_description,
              contact_person: element.contact_person,
              phone: element.phone,
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /* Cierra el modal de la compañia */
    registerCompany(info) {
      this.fixed = false;
      this.listCompany();
    },
    /* Tre la lista de las compañias creadas */
    listCompany() {
      this.rows = [];
      this.$axios
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

