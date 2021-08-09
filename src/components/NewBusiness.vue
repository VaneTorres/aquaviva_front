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
        <q-input
          v-model="nit"
          class="col-md-6 q-pa-sm"
          :rules="nitRules"
          type="text"
          label="NIT"
        />
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
    <q-step
      :name="2"
      title="Sede principal"
      icon="mdi-map-marker"
      :done="step > 1"
    >
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
      <div class="row">
        <q-select
          v-model="type_document"
          :options="options_type_document"
          color="primary"
          label="Tipo de documento"
          class="col-md-6 q-pa-sm"
        />
        <q-input
          v-model="numberIdentification"
          :rules="numberIdentificationRules"
          type="text"
          label="Número de identificación"
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
      </div>
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step != 3 ? true : false"
          @click="$refs.stepper.next()"
          color="primary"
          label="Continuar"
        />
        <q-btn
          v-show="step === 3 ? true : false"
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
const stringCiiuOptions = [];
const stringTownOptions = [];

export default {
  data() {
    return {
      /*-----------------------------------MODEL-VALUE------------------------------*/
      step: 1,
      nit: null,
      codeCiiu: null,
      logo: null,
      addresName: null,
      description: null,
      town: null,
      addres: null,
      phone: null,
      contect: null,
      type_document: null,
      numberIdentification: null,
      name: null,
      numberCel: null,
      email: null,
      options_ciiu: stringCiiuOptions,
      options_town: stringTownOptions,
      options_type_document: [],
      /*------------------------------------VALIDATE------------------------------*/
      nitRules: [(v) => !!v || "El NIT es requerido."],
      codeCiiuRule: [(v) => !!v || "El código CIIU es requerido."],
      townRule: [(v) => !!v || "El municipio es requerido."],
      addresNameRules: [(v) => !!v || "El nombre de la sede es requerida."],
      descriptionRules: [
        (v) => !!v || "La descripción de la sede es requerida.",
      ],
      addresRules: [(v) => !!v || "La dirección de la sede es requerida."],
      phoneRules: [(v) => !!v || "El teléfono de la sede es requerido."],
      contectRules: [(v) => !!v || "El responsable es requerido."],
      numberIdentificationRules: [
        (v) => !!v || "El número de identificación es requerido.",
      ],
      nameRules: [(v) => !!v || "Los nombres y apellidos son requeridos."],
      numberCelRules: [(v) => !!v || "El número de celular es requerido."],
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es valido.",
      ],
    };
  },
  methods: {
    submit() {
      const data = {
        autenticated: this.$q.localStorage.getItem("TOKEN"),
        nit: this.nit,
        codeCiiu: this.codeCiiu.id,
        addres: {
          addresName: this.addresName,
          description: this.description,
          town: this.town.id,
          contect: this.contect,
        },
        user: {
          document_type: this.type_document.id,
          document: this.document,
          name: this.name,
          phone: this.phone,
          email: this.email,
        },
      };
      this.$axios
        .post("http://127.0.0.1:8000/api/company_creation", data)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            message: `La empresa se registro con exito`,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkFileType(files) {
      return files.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `¡Formato no válido! por favor revise el formato del archivo`,
      });
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options_ciiu = stringCiiuOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        if (!isNaN(needle)) {
          this.options_ciiu = stringCiiuOptions.filter(
            (v) => v.value.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.options_ciiu = stringCiiuOptions.filter(
            (v) => v.description.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    filterTown(val, update) {
      if (val === "") {
        update(() => {
          this.options_town = stringTownOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options_town = stringTownOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    this.$axios
      .get("http://127.0.0.1:8000/api/get_ciiu")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_ciiu.push({
            label: element.ciiu.toString(),
            value: element.ciiu.toString(),
            id: element.id.toString(),
            description: element.description,
          });
        });
        stringCiiuOptions = this.options_ciiu;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("http://127.0.0.1:8000/api/get_towns")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_town.push({
            label: element.town.toString(),
            value: element.town,
            id: element.id.toString(),
          });
        });
        stringTownOptions = this.options_town;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .get("http://127.0.0.1:8000/api/get_document_types")
      .then((response) => {
        response.data.forEach((element) => {
          this.options_type_document.push({
            label: element.type,
            value: element.type,
            id: element.id,
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
