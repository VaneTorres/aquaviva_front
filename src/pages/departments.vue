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
              <q-btn
          flat
          dense
          color="secondary"
          label="Ver estructura organizacional"
         @click="seeval(props.row.id)"
        ></q-btn>
              <q-btn
          flat
          dense
          color="secondary"
          label="Ver tareas"
         @click="seeval(props.row.id)"
        ></q-btn>
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

const columns = [
  {
    name: "name",
    required: true,
    label: "DEPARTAMENTO",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "SEDE",
    field: "address",
    sortable: true,
  },
  { name: "action", label: "ACCION", field: "action", align: "center" },
];

const originalRows = [{name:"Contratistas tratamiento de aguas", address:"Coca-Cola - FEMSA"}];

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
      seeval(id) {this.$router.push({path: '/admin/organization' })},
    registerDepartaments(info) {
      this.newDepartments = false;
      this.rows.push({
        name: info.name,
        address: info.address_label,
      });
    },
  },

};
</script>
