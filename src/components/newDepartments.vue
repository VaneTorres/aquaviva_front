<template>
  <q-card style="width: 800px">
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
            :rules="addressRule"
            input-debounce="0"
            @filter="filterAddress"
            v-model="address"
            :options="optionsaddress"
            label="Sede"
            class="col-md-6 q-pa-sm"
            color="primary"
          />
        </div>
        <q-btn type="submit" label="Enviar" form="formDepartament" class="q-mt-lg"/>
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
      valid:true,
      //V-MODEL
      name: null,
      address: null,
      optionsaddress: stringAddressOptions,
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre del deparamento es requerida."],
      addressRule: [(v) => !!v || "La sede es requerida."],
    };
  },
  methods: {
    registerDepartaments() {
      var data = {
        area: this.name,
        id_address: this.address.id,
        name_address: this.address.label,
      };
      this.$axios
      .post("http://127.0.0.1:8000/api/store_area", data)
      .then((response) => {
        this.$emit("new", data);
      })
      .catch((e) => {
        console.log(e);
      });
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
  created() {
    //CONSULTAR LOS MUNICIPIOS
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_address_by_users", data)
      .then((response) => {
        this.optionsaddress.length=0;
        response.data.address.forEach((element) => {
          stringAddressOptions.push({
            label: element.name.toString(),
            value: element.name,
            id: element.id_address.toString(),
          });
        });
        this.optionsaddress=stringAddressOptions;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
