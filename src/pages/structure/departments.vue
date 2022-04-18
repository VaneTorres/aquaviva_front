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
            @click="newDepartments = true"
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
            <!-- <q-btn
              color="secondary"
              icon-right="mdi-book-open-page-variant-outline"
              no-caps
              flat
              dense
              @click="seeval(props.row.id, props.row.id_address)"
            >
              <q-tooltip>Ver tareas </q-tooltip>
            </q-btn> -->
            <q-btn
              color="secondary"
              icon-right="mdi-lan"
              no-caps
              flat
              dense
              @click="seeval(props.row.id, props.row.id_address)"
            >
              <q-tooltip>Ver estructura organizacional</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="newDepartments">
        <newDepartments v-on:new="registerDepartaments" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import newDepartments from "src/components/newDepartments.vue";
import { mapActions } from "vuex";
const columns = [
  {
    name: "area",
    required: true,
    label: "DEPARTAMENTO",
    align: "center",
    field: (row) => row.area,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name_address",
    align: "center",
    label: "SEDE",
    field: "name_address",
    sortable: true,
  },
  { name: "action", label: "ACCIÓN", field: "action", align: "center" },
];

const originalRows = [];

export default {
  components: {
    newDepartments,
  },
  data() {
    return {
      newDepartments: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    ...mapActions({
      GetAxios: "parameters/GetAxios",
    }),
    /* Muestra estructura organizacional */
    seeval(id_area, id_address) {
      this.$store.commit("parameters/SET_DEPARTAMENT", id_area);
      this.$store.commit("parameters/SET_ADDRESS", id_address);

      this.$router.push({ path: "/admin/organization" });
    },
    /* Fin muestra estructura organizacional */
    registerDepartaments() {
      this.newDepartments = false;
      this.departaments();
    },
    departaments() {
      this.rows = [];
      /*Treaer los departamentos*/
      this.GetAxios({ context: "get_areas" })
        .then((response) => {
          this.rows = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.departaments();
  },
};
</script>
