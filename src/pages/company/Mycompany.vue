<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <!-- INFORMACIÓN GENERAL DE LA EMPRESA -->
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="text-h6">Información de la compañia</div>
          </q-card-section>
          <q-separator inset></q-separator>
          <q-card-section>
            <q-list>
              <q-item class="fit row inline justify-center">
                <q-item-section>
                  <q-img
                    :ratio="16 / 9"
                    :src="
                      data.logo != null
                        ? 'http://localhost:8000/img/companies/' + data.logo
                        : 'http://localhost:8000/img/companies/sin_logo.png'
                    "
                    fit="contain"
                  ></q-img>
                </q-item-section>
              </q-item>
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
      <!-- FIN INFORMACIÓN GENERAL DE LA EMPRESA -->

      <!-- INFORMACIÓN DE SEDES DE LA EMPRESA -->
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6 col-2">Sedes</div>
              <div class="col-2">
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  @click="newaddress = true"
                  v-if="permissions.includes('Crear sede')"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator inset></q-separator>
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            :loading="loading"
          />
          <q-card-section> </q-card-section>
        </q-card>
      </div>
      <!-- FIN INFORMACIÓN DE SEDES DE LA EMPRESA -->
    </div>

    <!-- MODAL DE NUEVA SEDE -->
    <q-dialog v-model="newaddress">
      <NewAddress :id_company="id_company" v-on:new="registerAddress" />
    </q-dialog>
    <!--NEW MODAL DE NUEVA SEDE -->
  </q-page>
</template>

<script>
import NewAddress from "src/components/NewAddress.vue";
import { mapActions } from "vuex";

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
    label: "DIRECCIÓN DE LA SEDE",
    style:
      "max-width:5px; white-space: pre-wrap;  white-space: -moz-pre-wrap;  white-space: -pre-wrap;   white-space: -o-pre-wrap;  word-wrap: break-word; ",
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
    label: "DESCRIPCIÓN DE LA SEDE",
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
    label: "TELÉFONO",
    field: "phone",
    sortable: true,
  },
];
export default {
  components: {
    NewAddress,
  },
  data() {
    return {
      newaddress: false,
      loading: false,
      columns,
      id_company: null,
      permissions: [],
      data: {
        ciiu: null,
        ciiu_description: null,
        nit: null,
      },
      rows: [],
    };
  },
  methods: {
    /* VUEX */
    ...mapActions({
      GetAxios: "parameters/GetAxios",
    }),
    /* REGISTRAR SEDE */
    registerAddress() {
      this.newaddress = false;
      this.dataCompany();
    },
    /* CONSULTAR INFORMACIÓN DE LA EMPRESA Y SUS SEDES */
    dataCompany() {
      this.rows = [];
      this.loading = true;
      this.GetAxios({ context: "get_address_by_users" }).then((response) => {
        this.loading = false;
        this.id_company = response.data.company.id_company;
        this.data = {
          ciiu: response.data.company.ciiu,
          ciiu_description: response.data.company.ciiu_description,
          nit: response.data.company.nit,
          logo: response.data.company.logo,
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
      });
    },
  },
  mounted() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
    this.dataCompany();
  },
};
</script>
