<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Obligación: {{data.obligation}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
        <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >
    <!-- Información general de la ficha -->
    <q-step
      :name="1"
      title="Información general"
      icon="business"
      :done="step > 1"
    >
      <div class="row">
        <div class="col-md-6"><div class="text-subtitle2"> Codigo:</div> {{data.code}} </div>
        <div class="col-md-6"><div class="text-subtitle2">Nombre de la ficha: </div>{{data.worksheet}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Responsable: </div>{{data.responsable}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Sede: </div>{{data.address}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Meta: </div>{{data.worksheet}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Objetivo: </div>{{data.worksheet}}</div>
      </div>
   
        </q-step>
    <!-- Fin información general de la ficha -->
    <!-- Indicadores-->
    <q-step :name="2" title="Indicadores" icon="business" :done="step > 1">
         <div class="q-pt-md">
    <q-table
      title="Indicadores"
      :rows="rows"
      :columns="columnsIndicator"
      row-key="name"
    />
      </div>
      </q-step>
    <!-- Fin Indicadores-->
    <!-- Actividades-->
    <q-step :name="3" title="Actividades" icon="business" :done="step > 2">
      <div class="q-pt-md">
    <q-table
      title="Actividades"
      :rows="rows"
      :columns="columnsActivity"
      row-key="name"
    />
      </div>
      </q-step>
    <!--Fin Actividades-->
    <!-- Acciones -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step != 3 ? true : false"
          @click="$refs.stepper.next()"
          color="primary"
          label="Continuar"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Anterior"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
    <!-- Fin acciones -->
  </q-stepper>
    </q-card-section>
  </q-card>
</template>
<script>

const columnsIndicator = [
  {
    name: "indicatortype",
    required: true,
    label: "Tipo de indicador",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "indicator",
    align: "center",
    label: "Indicador",
    field: "indicator",
    sortable: true,
  },
  {
    name: "indicatorGoal",
    align: "center",
    label: "Meta",
    field: "indicatorGoal",
    sortable: true,
  },
  {
    name: "indicatorObjetive",
    align: "center",
    label: "Objetivo",
    field: "indicatorObjetive",
    sortable: true,
  },
  {
    name: "indicatorfrequency",
    align: "center",
    label: "Frecuencia",
    field: "indicatorfrequency",
    sortable: true,
  },
];
const columnsActivity = [
  {
    name: "activity",
    required: true,
    label: "Actividad",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "edit",
    align: "center",
    label: "Fecha editable",
    field: "edit",
    sortable: true,
  },
  {
    name: "activityStart",
    align: "center",
    label: "Fecha inicial",
    field: "activityStart",
    sortable: true,
  },
  {
    name: "activityFinish",
    align: "center",
    label: "Fecha final",
    field: "activityFinish",
    sortable: true,
  },
  {
    name: "activityBudget",
    align: "center",
    label: "Presupuesto",
    field: "activityBudget",
    sortable: true,
  },
];
export default {
   data() {
    return {
      step:1,
      columnsIndicator,
      columnsActivity,
      rows: [],
    };
  },
  props:{
    data: Object
  },
  mounted(){
   /*  this.data.forEach(element => {
       this.rows.push({
            nombre_sede: element.nombre_sede,
            address: element.address,
            town: element.town,
            address_description: element.address_description,
            contact_person: element.contact_person,
            phone: element.phone,
          });
    }); */
   
  }
};
</script>
<style>
.q-stepper{
  box-shadow: none !important;;
}
</style>
