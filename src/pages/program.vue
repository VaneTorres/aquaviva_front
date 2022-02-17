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
            >
              <q-tooltip> Ver detalles </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="fixed">
        <NewObligation @new="registerObligation" />
      </q-dialog>
      <q-dialog v-model="view">
        <ViewObligation :data="data" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* Componentes de ver y nuevo */
import NewObligation from "src/components/load_of_obligations/NewObligation.vue";
import ViewObligation from "src/components/load_of_obligations/ViewObligation.vue";
import { mapActions } from "vuex";
/* Columnas de las tablas */
const columns = [
  {
    name: "obligation",
    required: true,
    label: "CODIGO",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    align: "center",
    label: "NOMBRE",
    field: "code",
    sortable: true,
  },
  
  { name: "action", label: "ACCION", field: "action", align: "center" },
];

const originalRows = [];

export default {
  components: {
    NewObligation,
    ViewObligation,
  },
  data() {
    return {
      view: false,
      fixed: false,
      data: null,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    /* ...mapActions({
      axiosAction: "parameters/autenticatedAxios",
      logout: "parameters/logout",
    }), */
    seeval(id) {
      this.data = {
        id_company: id,
        obligation: "Plan de manejamiento ambiental",
        code: "PAM-001",
        worksheet: "Manejo de aguas residuales",
        responsable: "John Doe",
        address: "Coca-Cola-FEMSA",
      };
      this.view = true;
    },
    registerObligation(info) {
      this.fixed = false;
      this.rows.push({
        name: info.obligation_label,
        code: info.code,
        worksheet: info.name,
        responsable: info.responsable_label,
        address: info.address_label,
      });
      originalRows = this.rows;
    },
  },
  mounted() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios.post("http://127.0.0.1:8000/api/get_worksheets", data)
      .then((response) => {
        response.data.address.forEach((element) => {
          stringAddressOptions.push({
            label: element.name.toString(),
            value: element.name,
            id: element.id_address.toString(),
          });
        });
        this.optionsAddress = stringAddressOptions;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
