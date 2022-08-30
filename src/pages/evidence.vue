<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="obligations"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-space />
        <q-input outlined dense debounce="300" color="primary" v-model="filter">
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
    <q-dialog v-model="fliterevidence">
      <filtersEvidence @obligations="setObligations" />
    </q-dialog>
    <q-dialog v-model="evidence">
      <evidence />
    </q-dialog>
  </q-page>
</template>

<script>
import filtersEvidence from "src/components/Evidence/filtersEvidence.vue";
import evidence from "src/components/Evidence/evidence.vue";
const columns = [
  {
    name: "obligation",
    required: true,
    label: "OBLIGACIÓN",
    align: "center",
    field: (row) => row.tool,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "action",
    align: "center",
    label: "ACCIÓN",
    field: "action",
    sortable: true,
  },
];

/* const originalRows = [
  {
    oblig:
      "ESTADO DE CUMPLIMIENTO DE LOS PROGRAMAS DEL AEROPUERTO INTERNACIONAL ALFREDO VÁSQUEZ COBO PERIODO 2018",
  },
];
 */
export default {
  data() {
    return {
      fliterevidence: false,
      evidence: false,
      columns,
      obligations: [],

      //rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 15,
      permissions: [],
    };
  },
  components: {
    filtersEvidence,
    evidence,
  },
  methods: {
    seeval(id) {
      this.evidence = true;
      sessionStorage.setItem("id", id);
    },
    setObligations(obligations) {
      this.obligations = obligations;
    },
  },
  mounted() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.fliterevidence = true;
  },
};
</script>
