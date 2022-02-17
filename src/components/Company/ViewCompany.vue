<template>
  <!-- Card con información de la empresa -->
  <q-card v-if="info != null">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">NIT: {{ info.nit }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-sm ">
        <div class="col-md-6 col-12">
          <q-img :src="(info.logo != null)?('http://localhost:8000/img/companies/'+info.logo):('http://localhost:8000/img/companies/sin_logo.png')" fit="contain"></q-img>
        </div>
        <div class="col-md-6 col-12">
          <div class="text-subtitle2">Código de Ciiu:</div>
          {{ info.ciiu }}
          <div class="text-subtitle2 q-mt-md">Descripción de Ciiu:</div>
          {{ info.ciiu_description }}
        </div>
      </div>
      <q-separator class="q-my-md"/>
      <div v-if="info.admin !=null">
      <div class="text-h6">Administrador</div>
      <div class="row q-col-gutter-y-md">
        <div class="col-md-6 col-12">
          <div class="text-subtitle2">Tipo de identificación:</div>
          {{ info.admin.type }}</div>
        <div class="col-md-6 col-12">
          <div class="text-subtitle2">Número de identificación:</div>
          {{ info.admin.document }}
          </div>
          <div class="col-md-6 col-12">
          <div class="text-subtitle2">Nombre:</div>
          {{ info.admin.name }}
          </div>
          <div class="col-md-6 col-12">
          <div class="text-subtitle2">Teléfono:</div>
          {{ info.admin.mobile }}
        </div>
          <div class="col-md-6 col-12">
          <div class="text-subtitle2">Correo electrónico:</div>
          {{ info.admin.email }}
        </div>
      </div>
      </div>
      <div class="q-pt-md">
        <q-table title="Sedes" :rows="rows" :columns="columns" row-key="name" />
      </div>
    </q-card-section>
  </q-card>
  <!--Fin card con información de la empresa -->
</template>
<script>
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
    name: "address",
    align: "center",
    label: "DIRECCIÓN DE LA SEDE",
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
  data() {
    return {
      columns,
      rows: [],
      info: null,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    /* VUEX */
    ...mapActions({
      StorePost: "parameters/PostAxios",
    }),
  },
  mounted() {
    /* Consulta api de información de la compañia */
    this.StorePost({
      context: "http://127.0.0.1:8000/api/company_show",
      data: { id_company: this.id },
    }).then((response) => {
      this.info = response.data.company[0];
      response.data.company.forEach((element) => {
        this.rows.push({
          nombre_sede: element.nombre_sede,
          address: element.address,
          town: element.town,
          address_description: element.address_description,
          contact_person: element.contact_person,
          phone: element.phone,
        });
      });
      this.info.admin=response.data.admin
    });
    /* Fin consulta api de información de la compañia */
  },
};
</script>
