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
        <q-input
          v-model="name"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Nombre del plan"
        />
         <q-select
          use-input
          input-debounce="0"
          v-model="status"
          :options="optionsestatus"
          label="Estado"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-input
          v-model="numberUser"
          type="number"
          class="col-md-6 q-pa-sm"
          label="Número de usuarios"
        />
        <q-input
          v-model="numberProject"
          type="number"
          class="col-md-6 q-pa-sm"
          label="Número de proyectos"
        />
         <q-input
          v-model="price"
          class="col-md-6 q-pa-sm"
          label="Precio"
          mask="###.###.###"
          fill-mask=" "
          reverse-fill-mask
        ></q-input>
        <q-input
          v-model="Observations"
          type="textarea"
          class="col-md-12 q-pa-sm"
          label="Observaciones"
          autogrow
        >
        </q-input>
      </div>
    </q-step>
    <!-- Fin información general de la ficha -->
    <!-- Indicadores-->
    <q-step :name="2" title="Permisos" icon="business" :done="step > 1">
      <div class="row">
           <q-checkbox v-model="check_PMA" label="PMA"   class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_monitoring" label="Seguimiento y monitoreo"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_autority" label="Autoridades ambientales"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_admin" label="Actos administrativos"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_matrix" label="Módulo de matriz de requisitos legales"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_investment" label="Inversión de no menos de 1%"  class="col-md-6 q-pa-sm"/>
           <q-checkbox v-model="check_risk" label="Gestión de riesgo"  class="col-md-6 q-pa-sm"/>
      </div>
    </q-step>
    <!-- Fin Indicadores-->
    <!-- Acciones -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step ==1 ? true : false"
          @click="$refs.stepper.next()"
          color="primary"
          label="Continuar"
        />
        <q-btn
          v-show="step === 2 ? true : false"
          color="primary"
          label="Registrar plan"
          @click="submit()"
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
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
        loading: false,
      step: 1,
      valid: true,
      //model general
      name: null,
      numberUser: null,
      numberProject: null,
      price:null,
      status:null,
      optionsestatus:["Activo","Inactivo"],
      Observations: null,
      check_PMA:false,
      check_monitoring:false,
      check_autority:false,
      check_admin:false,
      check_matrix:false,
      check_investment:false,
      check_risk:false,
    };
  },
  methods:{
    submit(){
      this.$emit("new");
      this.$q.notify({
                type: "positive",
                message: `El plan se registro con exito`,
              });
}  }
};
</script>
