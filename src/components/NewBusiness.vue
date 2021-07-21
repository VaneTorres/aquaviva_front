<template>
  <!-- Start stepper -->
  
  <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >

    <!-- Start Company -->
    <q-step :name="1" title="Empresa" icon="business" :done="step > 1">
        <q-form id="formBusiness"  v-model="valid"
        lazy-validation>
        <q-input
          v-model="nit"
          :rules="nitRules"
          type="text"
          label="NIT"
        />
        <q-select
          :model-value="codeCiiu"
          use-input
          hide-selected
          :rules="codeCiiuRule"
          fill-input
          input-debounce="0"
          :options="options_ciiu"
          @filter="filterFn"
          @input-value="setModel"
          label="Código CIIU"
          color="primary"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No hay esultados </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        </q-select>
        <q-uploader
        class="q-pt-md"
          :filter="checkFileType"
          label="Cargar Logo (Formato png, jpeg)"
          @rejected="onRejected"
        />
            </q-form>

    </q-step>
    <!-- Finish Company -->
    <!-- Start Headquarters  -->
    <q-step :name="2" title="Sedes" icon="mdi-map-marker" :done="step > 1">
        <q-input
          v-model="name"
          :rules="nameRules"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Nombre"
        />
        <q-select
          v-model="codeCiiu"
          :options="options_ciiu"
          label="Ciudad"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-select
          v-model="codeCiiu"
          :options="options_ciiu"
          label="Municipio"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-input
          v-model="email"
          :rules="emailRules"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Dirección"
        />
        <q-input
          v-model="email"
          :rules="emailRules"
          class="col-md-6 q-pa-sm"
          type="text"
          label="Teléfono"
        />
        <q-input
          v-model="email"
          :rules="emailRules"
          class="col-md-6 q-pa-sm"
          type="text"
          label="Responsable"
        />
    </q-step>
         

    <q-step :name="3" title="Administrador" icon="person" :done="step > 2">
        <q-select
          v-model="model"
          :options="options"
          color="primary"
          label="Tipo de documento"
          class="col-md-6 q-pa-sm"
        />
        <q-input
          v-model="numberIdentification"
          :rules="numberIdentificationRules"
          type="text"
          label="Número de cedula"
          class="col-md-6 q-pa-sm"
        />
        <q-input
          v-model="name"
          :rules="nameRules"
          type="text"
          label="Nombre(s) y apellido(s)"
          class="col-md-6 q-pa-sm"
        />
        <q-input
          v-model="numberCel"
          :rules="numberCelRules"
          type="text"
          label="Número de celular"
          class="col-md-6 q-pa-sm"
        />
        <q-input
          v-model="email"
          :rules="emailRules"
          type="text"
          label="Correo electrónico"
          class="col-md-6 q-pa-sm"
        />
     
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          @click="$refs.stepper.next()"
          color="primary"
          :label="step === 3 ? 'Registrar' : 'Continuar'"
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
   
  </q-stepper>
  <!-- Finish stepper -->
  <q-separator />
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from 'vue';

const stringOptions = [
        {
          label: "0111",
          value: "0111",
          description:
            "Agricultura, ganadería, caza y actividades de servicios conexas",
        },
        {
          label: "0112",
          value: "0112",
          description: "Cultivos agrícolas transitorios",
        },
      ];
export default {
  setup() {
    const $q = useQuasar();
    const codeCiiu=ref(null);
    const options_ciiu= ref(stringOptions);
    /*----------------------------------FILE TYPE------------------------------*/
    function checkFileType(files) {
      return files.filter((file) => (file.type === "image/jpeg"||file.type === "image/png")  );
    }
    function onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `¡Formato no válido! por favor revise el formato del archivo`,
      });
    }
    /*---------------------------------FILTER SELECT-----------------------------*/
    function filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
          options_ciiu.value = stringOptions.filter(v => v.value.toLocaleLowerCase().indexOf(needle) > -1)
        })
      };

      function setModel (val) {
        codeCiiu.value = val
      }
    return {
      /*-----------------------------------MODEL-VALUE------------------------------*/
      codeCiiu,
      options_ciiu,
      nit: ref(null),
      step: ref(1),
      valid: ref(true),
       /*------------------------------------VALIDATE------------------------------*/
      nitRules: [(v) => !!v || "El NIT es requerido."],
      codeCiiuRule: [(v) => !!v || "El código CIIU es requerido."],
      /*------------------------------------FUNTIONS------------------------------*/
      checkFileType,
      onRejected,
      filterFn,
      setModel,  
       };
  },

  data() {
    return {
      /*-----------------------------------BUSINESS------------------------------*/
      businessName: "",
      MainAddress: "",
      MainPhone: "",
      logo: "",
      
      model: "",
      options: ["Cedula de ciudadanía", "Cedula de extranjería", "Pasaporte"],
      businessNameRules: [(v) => !!v || "La razón social es requerida."],
      MainAddressRules: [(v) => !!v || "La dirección principal es requerida."],
      MainPhoneRules: [
        (v) => !!v || "La teléfono es requerida.",
        (v) => !!/[1-6]$/i.test(v) || "El teléfono no es valido.",
      ],

     
    };
  },
};
</script>
