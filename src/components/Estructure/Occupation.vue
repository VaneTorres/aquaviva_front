<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">
        AGREGAR ESTRUCTURA
        {{ dataOccupation ? " A" + dataOccupation.name : "" }}
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
            class="col-md-6 q-pa-sm"
            label="Cargo"
          />
          <q-select
            v-if="UserExists == true"
            v-model="user"
            :options="options_user"
            color="primary"
            label="Usuario"
            class="col-md-6 q-pa-sm"
          />
          <q-select
            v-model="structure"
            :rules="structureRules"
            :options="options_structure"
            color="primary"
            label="Estructura"
            class="col-md-6 q-pa-sm"
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
              color="primary"
              label="Tipo de documento"
              class="col-md-6 q-pa-sm"
            />
            <q-input
              v-model="numberIdentification"
              type="text"
              label="Número de identificación"
              class="col-md-6 q-pa-sm"
            />
            <q-input
              v-model="name"
              type="text"
              label="Nombre(s) y apellido(s)"
              class="col-md-6 q-pa-sm"
            />
            <q-input
              v-model="mobile"
              type="text"
              label="Número de celular"
              class="col-md-6 q-pa-sm"
            />
            <q-input
              v-model="email"
              type="text"
              label="Correo electrónico"
              class="col-md-6 q-pa-sm"
            />
          </div>
        </div>
        <q-btn type="submit" label="Enviar" form="formAddress" />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringUserOptions = [];
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
      type_document:null,
      numberIdentification:null,
      options_user: stringUserOptions,
      options_structure: ["Compañero", "Persona a cargo"],
      options_type_document:[],
      //VALIDATE
      employmentRules: [(v) => !!v || "El cargo es requerido."],
      structureRules:[(v) => !!v || "Es nesesario seleccionar la estructura."]
    };
  },
  methods: {
    //REGISTRO DE SELECT
    registerOccupation() {
      var data = {
        employment: this.employment,
        id_area:this.$store.getters['parameters/departament'],
      };
      if(this.UserExists==false){
        data.user={
          id_document_type:this.type_document.id,
          document:this.numberIdentification,
          mobile:this.phone,
          name:this.name,
          email:this.email,
        }
      }else{
        data.id_user=this.user.id
      }
 this.$axios.post("http://127.0.0.1:8000/api/store_structure", data)
   .then((response) => { 
      console.log(response.data)
   })
      .catch((e) => {
        console.log(e);
      });    },
  },
  mounted() {
    //Llenar las opciones del select
    const data={id_address:this.$store.getters['parameters/address_departament']}
   this.$axios.post("http://127.0.0.1:8000/api/get_users_by_address", data)
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
