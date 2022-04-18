<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">AGREGAR SEDE</div>
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
        <div class="row q-col-gutter-sm">
          <q-input
            v-model="addressName"
            :rules="addressNameRules"
            type="text"
            class="col-md-6 col-12"
            label="Nombre (*)"
          />
          <q-input
            v-model="description"
            :rules="descriptionRules"
            class="col-md-6 col-12"
            autogrow
            label="Descripción (*)"
          />
          <q-select
            use-input
            :rules="townRule"
            input-debounce="0"
            @filter="filterTown"
            v-model="town"
            :options="options_town"
            label="Municipio (*)"
            class="col-md-6 col-12"
            color="primary"
          />
          <q-input
            v-model="address"
            :rules="addressRules"
            type="text"
            class="col-md-6 col-12"
            label="Dirección (*)"
          />
          <q-input
            v-model="phone"
            :rules="phoneRules"
            class="col-md-6 col-12"
            type="text"
            label="Teléfono (*)"
          />
          <q-input
            v-model="contact"
            :rules="contactRules"
            class="col-md-6 col-12"
            type="text"
            label="Responsable (*)"
          />
        </div>
        <q-btn
          class="q-my-sm float-right"
          color="primary"
          type="submit"
          label="Enviar"
          form="formAddress"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
const stringTownOptions = [];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      //MODEL-VALUE
      addressName: null,
      description: null,
      town: null,
      address: null,
      phone: null,
      contact: null,
      valid: true,
      options_town: stringTownOptions,
      //VALIDATE
      townRule: [(v) => !!v || "El municipio es requerido."],
      addressNameRules: [(v) => !!v || "El nombre de la sede es requerido."],
      descriptionRules: [
        (v) => !!v || "La descripción de la sede es requerida.",
      ],
      addressRules: [(v) => !!v || "La dirección de la sede es requerida."],
      phoneRules: [
        (v) => !!v || "El teléfono de la sede es requerido.",
        (v) =>
          v.length <= 10 ||
          "El teléfono debe de ser valido (Menor o igual a 10 caracteres)",
        (v) =>
          v.length >= 7 ||
          "El teléfono debe de ser valido (Mayor o igual a 7 caracteres)",
        (v) => /^[0-9]+$/i.test(v) || "El teléfono no debe tener letras",
      ],
      contactRules: [(v) => !!v || "El responsable de la sede es requerido."],
    };
  },
  methods: {
    ...mapActions({
      GetTown: "parameters/GetTown",
      StorePost: "parameters/PostAxios",
    }),
    //FILTRO DEL SELECT
    filterTown(val, update) {
      if (val === "") {
        update(() => {
          this.options_town = stringTownOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_town = stringTownOptions[0].filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    //REGISTRO DE SELECT
    registerAddress() {
      var data = {
        id_company: this.id_company,
        addressName: this.addressName,
        address: this.address,
        phone: this.phone,
        contact: this.contact,
        description: this.description,
        town: this.town.id,
        town_name: this.town.label,
        type_address: "Secundaria",
      };
      this.StorePost({
        context: "store_address",
        data: data,
      }).then(() => {
        this.$emit("new");
      });
    },
  },
  mounted() {
    this.GetTown().then((response) => {
      stringTownOptions.push(response);
    });
  },
};
</script>
