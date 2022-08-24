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
          @update:model-value="(v) => getMonitoringsToolsByAddress(v.id)"
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
      id_address: null,
      area: "",
      address: "",
      addressRules: [(v) => !!v || "La sede es requerida"],
      optionsAddress: [],
      monitoringsTools: [],
    };
  },
  props: {
    tools: Object,
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
    getMonitoringsToolsByAddress(id) {
      this.StorePost({
        context: "get_monitoring_tools_by_address",
        data: {
          id,
        },
      }).then((response) => {
        this.$emit("obligations", response.data);
      });
    },
  },
  mounted() {
    this.getOptionAddress();
  },
};
</script>
