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
            @click="newPlans = true"
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
         <template v-slot:body-cell-status="props">
          <q-td :props="props">
                        <q-badge :color="props.row.status=='Activo'?'primary':'negative'">{{ props.row.status }}</q-badge>

          </q-td>
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
      <q-dialog v-model="newPlans">
        <newPlans v-on:new="registerPlans" />
      </q-dialog>
      <q-dialog v-model="viewPlans">
        <viewPlans :data="data" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import newPlans from "src/components/plans/newPlans.vue";
import viewPlans from "src/components/plans/viewPlans.vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "PLAN",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "COSTO",
    field: "price",
    sortable: true,
  },
  { name: "action", label: "ACCION", field: "action", align: "center" },
];

const originalRows = [{name:"Versión FULL", price:"1000",status:"Activo"}];

export default {
  components: {
    newPlans,viewPlans,
  },
  data() {
    return {
      viewPlans:false,
      newPlans: false,
      columns,
      data:null,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
      seeval(id) {
        this.data={name:"Versión FULL", price:"1000",status:"Activo",numberUser:"5",numberproject:"2",observation:"Solo es un pago de por vida"}
        this.viewPlans=true;
        },
    registerPlans(info) {
      this.newPlans = false;
      this.rows.push({
        name: info.name,
        price: info.address_label,
      });
    },
  },

};
</script>
