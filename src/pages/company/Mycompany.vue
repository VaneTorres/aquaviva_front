<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="text-h6">Información de la compañia</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"
                    ><div class="text-subtitle2">Nit:</div>
                    {{ data.nit }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"
                    ><div class="text-subtitle2">Codigo ciiu:</div>
                    {{ data.ciiu }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"
                    ><div class="text-subtitle2">Descripción ciiu:</div>
                    {{ data.ciiu_description }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="row ">
              <div class="text-h6 col-md-6">Sedes</div>
              <div class="offset-md-5">
                <q-btn round color="primary" icon="add" @click="newaddress = true" />
              </div>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>
          <q-table :rows="rows" :columns="columns" row-key="name" />
          <q-card-section> </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="newaddress" >
        <NewAddress :id_company="id_company" v-on:new="registerAddress"/>
      </q-dialog>
  </q-page>
</template>

<script>
import NewAddress from "src/components/NewAddress.vue";


const columns = [
  {
    name: "nombre_sede",
    required: true,
    label: "NOMBRE DE LA SEDE",
    align: "center",
    field: (row) => row.nombre_sede,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "TIPO DE LA SEDE",
    field: "type",
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "DIRECCION DE LA SEDE",
    field: "address",
    sortable: true,
  },
  {
    name: "town",
    align: "center",
    label: "CIUDAD",
    field: "town",
    sortable: true,
  },
  {
    name: "address_description",
    align: "center",
    label: "DESCRIPCION DE LA SEDE",
    field: "address_description",
    sortable: true,
  },
  {
    name: "contact_person",
    align: "center",
    label: "PERSONA DE CONTACTO",
    field: "contact_person",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "TELEFONO",
    field: "phone",
    sortable: true,
  },
];

const originalRows = [];
export default {
  components: {
    NewAddress,
  },
  data() {
    return {
      newaddress:false,
      columns,
      id_company:null,
      data: {
        ciiu: null,
        ciiu_description: null,
        nit: null,
      },
      rows: originalRows,
    };
  },
  methods:{
    registerAddress(info) {
      console.log(info);
      this.newaddress=false;
      this.rows.push({
            type: info.type_address,
            nombre_sede: info.addressName,
            address: info.address,
            town: info.town_name,
            address_description: info.description,
            contact_person: info.contact,
            phone: info.phone,
          });
    },
  },
  mounted() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_address_by_users", data)
      .then((response) => {
        this.id_company=response.data.company.id_company;
        this.data = {
          ciiu: response.data.company.ciiu,
          ciiu_description: response.data.company.ciiu_description,
          nit: response.data.company.nit,
        };
        response.data.address.forEach((element) => {
          this.rows.push({
            type: element.type,
            nombre_sede: element.name,
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
};
</script>
