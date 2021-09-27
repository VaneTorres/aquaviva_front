<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
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
              @click="seeval(1)"
            />
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="fixed">
        <NewObligation @new="registerObligation"/>
      </q-dialog>
      <q-dialog v-model="view">
        <ViewObligation :data="data"/>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewObligation from "src/components/load_of_obligations/NewObligation.vue";
import ViewObligation from "src/components/load_of_obligations/ViewObligation.vue";
const columns = [
  {
    name: "obligation",
    required: true,
    label: "OBLIGACIÓN",
    align: "center",
    field: (row) => row.name,
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
    name: "worksheet",
    align: "center",
    label: "NOMBRE DE LA FICHA",
    field: "worksheet",
    sortable: true,
  },
  
  {
    name: "responsable",
    align: "center",
    label: "RESPONSABLE",
    field: "responsable",
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "SEDE",
    field: "address",
    sortable: true,
  },
    { name: "action", label: "ACCION", field: "action", align: "center" }
];

const originalRows = [{name:"Plan de manejamiento ambiental",code:"PAM-001",worksheet:"Manejo de aguas residuales",responsable:"John Doe",address:"Coca-Cola-FEMSA"}];

export default {
  components: {
    NewObligation,
    ViewObligation
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
  methods:{
    seeval(id) {
      this.data={ id_company: id,obligation: "Plan de manejamiento ambiental",code:"PAM-001",worksheet:"Manejo de aguas residuales",responsable:"John Doe", address:"Coca-Cola-FEMSA" };
      this.view=true;
    },
    registerObligation(info){
       this.fixed = false;
          this.rows.push({
            name: info.obligation_label,
            code: info.code,
            worksheet: info.name,
            responsable: info.responsable_label,
            address: info.address_label,
          });
        originalRows = this.rows;
    }
  },
  created() {
    /* this.$axios
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
        originalRows = this.rows;
      })
      .catch((e) => {
        console.log(e);
      }); */
  },
};
</script>
