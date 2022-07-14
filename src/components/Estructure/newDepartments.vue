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
        <div class="row q-col-gutter-sm">
          <q-input
            v-model="name"
            :rules="nameRules"
            type="text"
            class="col-md-6 col-12"
            label="Nombre del depatamento (*)"
          />
          <q-select
            use-input
            :rules="addressRule"
            input-debounce="0"
            @filter="filterAddress"
            v-model="address"
            :options="optionsaddress"
            label="Sede  (*)"
            class="col-md-6 col-12"
            color="primary"
          />
        </div>
        <q-btn
          type="submit"
          color="primary"
          label="Enviar"
          form="formDepartament"
          class="q-mt-lg float-right q-my-md"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
const stringAddressOptions = [];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      valid: true,
      //V-MODEL
      name: null,
      address: null,
      optionsaddress: stringAddressOptions,
      //VALIDATE
      nameRules: [(v) => !!v || "El nombre del departamento es requerida."],
      addressRule: [(v) => !!v || "La sede es requerida."],
    };
  },
  methods: {
    ...mapActions({
      GetAddress: "parameters/GetAddress",
      StorePost: "parameters/PostAxios",
    }),
    registerDepartaments() {
      var data = {
        area: this.name,
        id_address: this.address.id,
        name_address: this.address.label,
      };
      this.StorePost({
        context: "store_area",
        data: data,
      }).then(() => {
        this.$emit("new");
      });
    },
    //FILTRO DEL SELECT
    filterAddress(val, update) {
      if (val === "") {
        update(() => {
          this.optionsaddress = stringAddressOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsaddress = stringAddressOptions[0].filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  created() {
    //Select address
    this.GetAddress().then((response) => {
      stringAddressOptions.push(response);
    });
  },
};
</script>
