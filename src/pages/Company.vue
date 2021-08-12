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
              color="primary"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="deleteval(data.indexOf(props.row))"
            />
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
      <q-dialog v-model="fixed">
        <NewCompany />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewCompany from "components/NewCompany.vue";
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
  { name: "action", label: "Acción", field: "action", align: "center" },
];

const originalRows = [];

export default {
  components: {
    NewCompany,
  },
  data() {
    return {
      fixed: false,
      columns,
      rows: originalRows,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },

  methods: {
    seeval(id) {
      console.log(id);
      const data={id_company:id};
      this.$axios
        .post("http://127.0.0.1:8000/api/company_show", data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addRow() {
      this.loading = true;
      this.rows = originalRows;
      setTimeout(() => {
        const index = Math.floor(Math.random() * (this.rows.value.length + 1)),
          row = originalRows[Math.floor(Math.random() * originalRows.length)];

        if (this.rows.value.length === 0) {
          this.rowCount.value = 0;
        }

        this.row.id = ++this.rowCount.value;
        const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.rows = [
          ...this.rows.value.slice(0, index),
          newRow,
          ...this.rows.value.slice(index),
        ];
        this.loading = false;
      }, 500);
    },
  },
  created() {
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
        originalRows = this.rows;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  beforeCreate() {
    if (this.$q.localStorage.getItem("redirect") == true) {
      this.$router.go(0);
      this.$q.localStorage.set("redirect", false);
    }
  },
};
</script>

