<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">
        AGREGAR ESTRUCTURA
        {{ dataOccupation ? " DE " + dataOccupation.name.toUpperCase() : "" }}
      </div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formAddress"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerOccupation"
      >
        <div class="row">
          <q-input
            v-model="employment"
            :rules="employmentRules"
            type="text"
            class="col-md-6 q-pa-sm q-my-sm"
            label="Cargo"
          />
          <q-select
            v-if="UserExists == true"
            v-model="user"
            :options="options_user"
            color="primary"
            label="Usuario"
            class="col-md-6 q-pa-sm q-my-sm"
          />
          <q-select
            v-if="dataOccupation"
            v-model="structure"
            :rules="structureRules"
            :options="options_structure"
            color="primary"
            label="Estructura"
            class="col-md-6 q-pa-sm q-my-sm"
          />
          <q-btn
            flat
            class="col-md-12 q-my-md"
            v-if="UserExists == true"
            @click="UserExists = false"
            color="primary"
            label="¿El usuario para este cargo aun se encuentra registrado?"
          />
          <div class="row" v-if="UserExists == false">
            <q-select
              v-model="type_document"
              :options="options_type_document"
              :rules="typeDocumentRules"
              color="primary"
              label="Tipo de documento"
              class="col-md-6 q-pa-sm q-my-sm"
            />
            <q-input
              v-model="numberIdentification"
              :rules="numberIdentificationRules"
              type="text"
              label="Número de identificación"
              class="col-md-6 q-pa-sm q-my-sm"
            />
            <q-input
              v-model="name"
              :rules="nameRules"
              type="text"
              label="Nombre(s) y apellido(s)"
              class="col-md-6 q-pa-sm q-my-sm"
            />
            <q-input
              v-model="mobile"
              :rules="mobileRules"
              type="text"
              label="Número de celular"
              class="col-md-6 q-pa-sm q-my-sm"
            />
            <q-input
              v-model="email"
              :rules="emailRules"
              type="text"
              label="Correo electrónico"
              class="col-md-6 q-pa-sm q-my-sm"
            />
          </div>
        </div>
        <q-btn type="submit" color="primary" label="Enviar" form="formAddress" class=" q-my-sm" />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
var stringUserOptions = [];
export default {
  props: { dataOccupation: Object },
  data() {
    return {
      UserExists: true,
      valid: true,
      //MODEL-VALUE
      employment: null,
      user: null,
      structure: null,
      mobile: null,
      name: null,
      email: null,
      type_document: null,
      numberIdentification: null,
      options_user: stringUserOptions,
      options_structure: ["Compañero", "Persona a cargo"],
      options_type_document: [],
      //VALIDATE
      employmentRules: [(v) => !!v || "El cargo es requerido."],
      structureRules: [(v) => !!v || "Es nesesario seleccionar la estructura."],
      typeDocumentRules: [
        (v) => !!v || "Es nesesario seleccionar el tipo de documento.",
      ],
      mobileRules: [
        (v) => !!v || "El número de celular es requerido.",
        (v) => v.length <= 10 || "El número de celular debe de ser valido",
        (v) => /^[0-9]/.test(v) || "El número de celular no debe tener letras",
      ],
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es valido.",
      ],
      nameRules: [
        (v) => !!v || "Los nombres y apellidos son requeridos.",
      ],
      numberIdentificationRules: [
        (v) => !!v || "El número de identificación es requerido.",
      ],
    };
  },
  methods: {
    //REGISTRO DE SELECT
    registerOccupation() {
      var data = {
        employment: this.employment,
        id_area: this.$store.getters["parameters/departament"],
      };
      if (this.UserExists == false) {
        data.user = {
          document_type: this.type_document.id,
          document: this.numberIdentification,
          mobile: this.mobile,
          name: this.name,
          email: this.email,
        };
      } else {
        data.id_user = this.user.id;
      }
      if (this.structure == "Persona a cargo") {
        data.id_father = this.dataOccupation.id_structure;
      } else if (this.structure == "Compañero") {
        data.id_father = this.dataOccupation.id_father;
        data.id_mate = this.dataOccupation.id_structure;
      }
      this.$axios
        .post("http://127.0.0.1:8000/api/store_structure", data)
        .then((response) => {
          this.$q.notify({
            message: "Se ha registrado correctamente.",
            type: "positive",
          });
          this.$emit("new", data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    //Llenar las opciones del select
    stringUserOptions=[]
    const data = {
      id_address: this.$store.getters["parameters/address_departament"],
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_users_by_address", data)
      .then((response) => {
        response.data.forEach((element) => {
          stringUserOptions.push({
            label: element.name,
            value: element.name,
            id: element.id,
          });
        });
       this.options_user=stringUserOptions;
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
