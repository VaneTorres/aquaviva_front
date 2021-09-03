<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR</div>
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
        <q-input
          v-model="addressName"
          :rules="addressNameRules"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Cargo"
        />
        <q-select
        v-if="UserExists==false"
          v-model="type_document"
          :options="options_type_document"
          color="primary"
          label="Usuario"
          class="col-md-6 q-pa-sm"
        />
        <q-btn flat class="col-md-12 q-pa-sm"  v-if="UserExists==false" @click="UserExists=true" label="¿El usuario aun se encuentra registrado?"/>
        <div class="row" v-if="UserExists==true">
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
          v-model="mobile"
          :rules="mobileRules"
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
      </div>
      <q-btn type="submit" label="Enviar" form="formAddress" />

      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringTownOptions = [];
export default {
  props:{ id_company: {
      type: Number
    },},
data() {
    return {
      UserExists:false,
      //MODEL-VALUE
      addressName: null,
      description: null,
      town: null,
      address: null,
      phone: null,
      contact: null,
     valid:true,
      options_town: stringTownOptions,
      //VALIDATE
      townRule: [(v) => !!v || "El municipio es requerido."],
      addressNameRules: [(v) => !!v || "El nombre de la sede es requerida."],
      descriptionRules: [
        (v) => !!v || "La descripción de la sede es requerida.",
      ],
      addressRules: [(v) => !!v || "La dirección de la sede es requerida."],
      phoneRules: [(v) => !!v || "El teléfono de la sede es requerido."],
      contactRules: [(v) => !!v || "El responsable de la sede es requerido."],
      
    };},
    methods:{
      //FILTRO DEL SELECT
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
    //REGISTRO DE SELECT
      registerAddress(){
        var data={
         id_company: this.id_company,
         addressName: this.addressName,
          address: this.address,
          phone:this.phone,
          contact: this.contact,
          description: this.description,
          town: this.town.id,
          town_name: this.town.label,
          type_address:"Secundaria"
        }
        
        this.$axios
      .post("http://127.0.0.1:8000/api/store_address",data)
      .then((response) => {
         this.$emit("new", data);
       this.$q.notify({
              message:
                "Se ha registrado correctamente.",
              type: "positive",
            });
      })
      .catch((e) => {
        console.log(e);
      });
      }
    },
  mounted(){
    //CONSULTAR LOS MUNICIPIOS
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
  }
};
</script>
