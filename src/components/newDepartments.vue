<template>
  <q-card style="width:800px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR DEPARTAMENTO</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formDepartament"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="registerDepartaments"
      >
        <div class="row">
          <q-input
            v-model="name"
            :rules="nameRules"
            type="text"
            class="col-md-6 q-pa-sm"
            label="Nombre del depatamento"
          />
          <q-select
            use-input
            :rules="addresRule"
            input-debounce="0"
            @filter="filterAddress"
            v-model="address"
            :options="optionsaddress"
            label="Sede"
            class="col-md-6 q-pa-sm"
            color="primary"
          />
          
        </div>
        <q-btn type="submit" label="Enviar" form="formDepartament" />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
const stringAddressOptions = [];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      //MODEL-VALUE
      name: null,
      address: null,
      optionsaddress: stringAddressOptions,
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre de la sede es requerida."],
    };
  },
  methods: {
   registerDepartaments(){
    var data={name: this.name,
      address:this.address.id,address_label:this.address.label}
      this.$emit("new", data);
   },
    //FILTRO DEL SELECT
    filterAddress(val, update) {
      if (val === "") {
        update(() => {
          this.optionsaddress = stringAddressOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsaddress = stringAddressOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    //CONSULTAR LOS MUNICIPIOS
    this.$axios
      .post("http://127.0.0.1:8000/api/get_address_by_users", data)
      .then((response) => {
        response.data.address.forEach((element) => {
          this.optionsaddress.push({
            label: element.name.toString(),
            value: element.name,
            id: element.id_address.toString(),
          });
        });
        stringAddressOptions = this.optionsaddress;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
