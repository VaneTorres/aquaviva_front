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
       <div class="row">
        <q-input v-model="nit"   class="col-md-6 q-pa-sm" :rules="nitRules" type="text" label="NIT" />
        <q-select
          v-model="codeCiiu"
          use-input
           class="col-md-6 q-pa-sm"
          :rules="codeCiiuRule"
          input-debounce="0"
          :options="options_ciiu"
          @filter="filterFn"
          label="Código CIIU"
          color="primary"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >No hay esultados
              </q-item-section>
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
 class="col-md-12 q-pa-sm"
           :filter="checkFileType"
          label="Cargar Logo (Formato png, jpeg)"
          @rejected="onRejected"
        />
       </div>
    </q-step>
    <!-- Finish Company -->
    <!-- Start Headquarters  -->
    <q-step :name="2" title="Sede principal" icon="mdi-map-marker" :done="step > 1">
       <div class="row">
      <q-input
        v-model="addresName"
        :rules="addresNameRules"
        type="text"
        class="col-md-6 q-pa-sm"
        label="Nombre"
      />
      <q-input
      v-model="description"
       :rules="descriptionRules"
      class="col-md-6 q-pa-sm"
      autogrow
      label="Descripción"
    />
      <q-select
          use-input
          :rules="townRule"
          input-debounce="0"
          @filter="filterTown"
        v-model="town"
        :options="options_town"
        label="Municipio"
        class="col-md-6 q-pa-sm"
        color="primary"
      />
      <q-input
        v-model="addres"
        :rules="addresRules"
        type="text"
        class="col-md-6 q-pa-sm"
        label="Dirección"
      />
      <q-input
        v-model="phone"
        :rules="phoneRules"
        class="col-md-6 q-pa-sm"
        type="text"
        label="Teléfono"
      />
      <q-input
        v-model="contect"
        :rules="contectRules"
        class="col-md-6 q-pa-sm"
        type="text"
        label="Responsable"
      />
      
       </div>
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
        v-show="step != 3? true:false"
          @click="$refs.stepper.next()"
          color="primary"
          label="Continuar"
        />
        <q-btn
        v-show="step === 3? true:false"
          @click="submit()"
          color="primary"
          label="Registrar"
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
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

const stringCiiuOptions = [
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
const stringTownOptions = [ "Bogotá", "Manizales"];
export default {
  setup() {
    const $q = useQuasar();
    const codeCiiu = ref(null);
    const nit = ref(null);
    const addresName = ref(null);
    const description = ref(null);
    const addres = ref(null);
    const phone = ref(null);
    const logo = ref(null);
    const town = ref(null);
    const contect = ref(null);
    const options_ciiu = ref(stringCiiuOptions);
    const options_town = ref(stringTownOptions);
    /*----------------------------------FILE TYPE------------------------------*/
    function submit() {
       const data = { nit: nit.value, codeCiiu: codeCiiu.value, name:addresName.value,description:description.value, contect:contect.value };
    }
    function checkFileType(files) {
      return files.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
    }
    function onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `¡Formato no válido! por favor revise el formato del archivo`,
      });
    }
    /*---------------------------------FILTER SELECT-----------------------------*/
    function filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        options_ciiu.value = stringCiiuOptions.filter(
          (v) => v.value.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }
    function filterTown(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        options_town.value = stringTownOptions.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }

    return {
      /*-----------------------------------MODEL-VALUE------------------------------*/
      step: ref(1),
      nit,
      codeCiiu,
      logo,
      addresName,
      description,
      town,
      addres,
      phone,
      contect,
      options_ciiu,
      options_town,
      /*------------------------------------VALIDATE------------------------------*/
      nitRules: [(v) => !!v || "El NIT es requerido."],
      codeCiiuRule: [(v) => !!v || "El código CIIU es requerido."],
      townRule: [(v) => !!v || "El municipio es requerido."],
      addresNameRules: [(v) => !!v || "El nombre de la sede es requerida."],
      descriptionRules: [(v) => !!v || "La descripción de la sede es requerida."],
      addresRules: [(v) => !!v || "La dirección de la sede es requerida."],
      phoneRules: [(v) => !!v || "El teléfono de la sede es requerida."],
      contectRules: [(v) => !!v || "El responsable es requerida."],
      /*------------------------------------FUNTIONS------------------------------*/
      checkFileType,
      onRejected,
      filterTown,
      filterFn,
      submit,
    };
  },
};
</script>
