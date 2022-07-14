<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
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
        <q-select
          use-input
          :rules="addressRules"
          input-debounce="0"
          v-model="address"
          :options="optionsAddress"
          label="Sede"
          class="col-md-6 col-12"
          color="primary"
          @update:model-value="(v) => getAreByAddress(v.id)"
        />
        <q-select
          use-input
          input-debounce="0"
          v-model="area"
          :options="optionsArea"
          label="Departamento"
          option-label="area"
          option-value="id"
          class="col-md-6 col-12"
          color="primary"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      area: "",
      address: "",
      addressRules: [(v) => !!v || "La sede es requerida"],
      optionsAddress: [],
      optionsArea: [],
    };
  },
  methods: {
    ...mapActions({
      GetAddress: "parameters/GetAddress",
      StorePost: "parameters/PostAxios",
    }),
    getOptionAddress() {
      this.GetAddress().then((response) => {
        this.optionsAddress = response;
      });
    },
    getAreByAddress(id) {
      this.StorePost({
        context: "get_area_by_address",
        data: { id_address: id },
      }).then((response) => {
        console.log(response);
        this.optionsArea = response.data;
      });
    },
  },
  mounted() {
    this.getOptionAddress();
  },
};
</script>
