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
        <!--  <template v-slot:body-cell-action="props">
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
        </template> -->
      </q-table>
      <q-dialog v-model="fixed">
        <NewObligation @new="listObligation" />
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
    name: "enviorenmental_monitoring",
    required: true,
    label: "PROYECTO DE MONITOREO",
    align: "center",
    field: (row) => row.enviorenmental_monitoring,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tool",
    align: "center",
    label: "OBLIGACIÓN",
    field: "tool",
    sortable: true,
  },
  {
    name: "program",
    align: "center",
    label: "PROGRAMA",
    field: "program",
    sortable: true,
  },
  {
    name: "project",
    align: "center",
    label: "PROYECTO",
    field: "project",
    sortable: true,
  },
  {
    name: "name",
    align: "center",
    label: "NOMBRE DE LA FICHA",
    field: "name",
    sortable: true,
  },
  /*  { name: "action", label: "ACCION", field: "action", align: "center" }, */
];

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
      rows: [],
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    ...mapActions({
      GetAxios: "parameters/GetAxios",
    }),
    seeval(id) {
      this.data = id;
      this.view = true;
    },
    listObligation() {
      this.fixed = false;
      this.loading = true;
      this.GetAxios({ context: "get_worksheets" }).then((response) => {
        this.rows = response.data;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.listObligation();
  },
};
</script>
