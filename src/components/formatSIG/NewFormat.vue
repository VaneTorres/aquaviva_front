<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR FORMATOS</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formAddress"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerAddress"
      >
        <div class="row">
          <q-select
            use-input
            :rules="environmentRule"
            input-debounce="0"
            @filter="filterEnvironment"
            v-model="environment"
            :options="options_environment"
            label="Medio"
            class="col-md-6 q-pa-sm q-my-sm"
            color="primary"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_component"
            label="Componente"
            class="col-md-6 q-pa-sm q-my-sm"
            color="primary"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_format"
            label="Formato"
            class="col-md-6 q-pa-sm q-my-sm"
            color="primary"
          />
          <q-input
            v-model.number="numberFormat"
            :rules="numberFormatRules"
            type="number"
            class="col-md-6 q-pa-sm q-my-sm"
            label="Cantidad de formatos"
          />
        </div>
        <q-btn
          type="submit"
          label="Enviar"
          form="formAddress"
          class="q-my-sm"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringTownOptions = [];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      numberFormat: null,
      numberFormatRules: [
        (v) => !!v || "El número deseado de formatos es requerido.",
        (v) => /^[0-9]/.test(v) || "El número deseado de formatos no es válido.",
      ]
    };
  },
};
</script>