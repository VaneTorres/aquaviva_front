<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">NIT: {{data[0].nit}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-md-6"><div class="text-subtitle2">Código de Ciiu:</div> {{data[0].ciiu}} </div>
        <div class="col-md-6"><div class="text-subtitle2">Descripción de Ciiu: </div>{{data[0].ciiu_description}}</div>
      </div>
      <div class="q-pt-md">
    <q-table
      title="Sedes"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
      </div>
      
    </q-card-section>
  </q-card>
</template>
<script>

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
    };
  },
  props:{
    data: [Object]
  },
  mounted(){
    this.data.forEach(element => {
       this.rows.push({
            nombre_sede: element.nombre_sede,
            address: element.address,
            town: element.town,
            address_description: element.address_description,
            contact_person: element.contact_person,
            phone: element.phone,
          });
    });
   
  }
};
</script>
