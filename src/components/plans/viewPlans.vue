<template>
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
        <div class="col-md-6"><div class="text-subtitle2">Nombre del plan: </div>{{data.name}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Estado: </div>{{data.status}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Costo: </div>{{data.price}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Numero de usuarios: </div>{{data.numberUser}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Numero de proyectos: </div>{{data.numberproject}}</div>
        <div class="col-md-6"><div class="text-subtitle2">Observaciones: </div>{{data.observation}}</div>

      </div>
    </q-step>
    <!-- Fin información general de la ficha -->
    <!-- Indicadores-->
    <q-step :name="2" title="Permisos" icon="business" :done="step > 1">
      <div class="row">
           <q-checkbox v-model="check_PMA" label="PMA"   class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_monitoring" label="Segimiento y monitoreo"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_autority" label="Autoridades ambientales"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_admin" label="Actos administrativos"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_matrix" label="Modulo de matriz de requisitos legales"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_investment" label="Inversión de no menos de 1%"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_risk" label="Gestión de riesgo"  class="col-md-6 q-pa-sm"/>
      </div>
    </q-step>
    <!-- Fin Indicadores-->
    <!-- Acciones -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step == 1 ? true : false"
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
</template>
<script>

export default {
   props:{
    data: Object
  },
  data() {
    return {
      step: 1,
      check_PMA:false,
      check_monitoring:false,
      check_autority:false,
      check_admin:false,
      check_matrix:false,
      check_investment:false,
      check_risk:false,
    };
  },
  methods: {
      submit(){
       /*  var data={
          obligation: this.obligation.id,
          obligation_label: this.obligation.label,
          name: this.name,
          code: this.code,
          objetive: this.objetive,
          goal: this.goal,
          address: this.address.id,
          address_label: this.address.label,
          responsable: this.responsable.id,
          responsable_label: this.responsable.label,
          observations: this.Observations,
          activity:this.rowsActivity,
          indicator:this.rowsIndicator
        }
        this.$emit("new", data); */
      },
  },
};
</script>
