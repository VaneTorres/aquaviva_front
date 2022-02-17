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
            @click="newMonitoring = true"
          >
            <q-tooltip>Añadir formato</q-tooltip>
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
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              text-color="black"
              class="text-caption text-weight-medium"
              :color="props.row.status == 'Diligenciado' ? 'info' : 'negative'"
              >{{ props.row.status }}</q-badge
            >
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="mdi-eye"
              no-caps
              flat
              dense
              @click="seeval(props.row.id)"
            >
              <q-tooltip>Ver detalles </q-tooltip>
            </q-btn>
            <q-btn
              color="primary"
              icon-right="mdi-pencil-outline"
              no-caps
              flat
              dense
              @click="excel(props.row.id)"
            >
              <q-tooltip>Diligenciar formulario </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="newMonitoring">
        <NewFormat v-on:new="registerMonitoring" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewFormat from "src/components/formatSIG/NewFormat.vue";
const columns = [
  {
    name: "name",
    required: true,
    label: "MEDIO",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "format",
    align: "center",
    label: "FORMATO",
    field: "format",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
  },
  { name: "action", label: "ACCIÓN", field: "action", align: "center" },
];

const originalRows = [
  { name: "Medio abiótico", format: "Estratigrafía", status: "Diligenciado" },
];

export default {
  components: {
    NewFormat,
  },
  data() {
    return {
      newMonitoring: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    excel(document){
    this.$router.push({ path: "/admin/excel" });
  },
    registerMonitoring(info) {
      this.newMonitoring = false;
      this.rows.push({
        name: info.project,
        tool: info.tool,
        authority: info.authority,
        town: info.town,
        especification: info.especification,
      });
    },
  },

  created() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_excel_companies", data)
      .then((response) => {
        response.data.forEach((element) => {
          this.rows.push({
            name: element.project,
            tool: element.tool,
            authority: element.authority,
            town: element.town,
            especification: element.especification,
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
