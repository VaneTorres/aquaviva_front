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
          @input-update="getProjects((v) => v.id)"
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
      address: "",
      addressRules: [(v) => !!v || "La sede es requerida"],
      optionsAddress: [],
      optionsProjects: [],
    };
  },
  methods: {
    ...mapActions({ GetAddress: "parameters/GetAddress" }),
    getOptionAddress() {
      this.GetAddress().then((response) => {
        this.optionsAddress = response;
      });
    },
    getProjects(info) {
      /* console.log(info);
      this.GetProjects(this.address).then((response) => {
        this.optionsProjects = response;
      }); */
    },
  },
  mounted() {
    this.getOptionAddress();
  },
};
</script>
