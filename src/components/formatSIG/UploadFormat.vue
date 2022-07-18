<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">SUBIR FORMATOS</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form
        id="formUploadFormat"
        v-model="valid"
        lazy-validation
        class="text-center"
        @submit.prevent="uploadFormat"
      >
        <q-file
          bottom-slots
          v-model="file"
          label="Cargar archivo"
          counter
          :rules="fileRules"
        >
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="file = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <q-btn
          type="submit"
          form="formUploadFormat"
          color="primary"
          label="Enviar"
          class="q-my-md float-right"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      file: null,
      valid: true,
      fileRules: [
        (v) => !!v || "Debe seleccionar un archivo",
        (v) =>
          v.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          "El archivo debe ser un archivo excel",
      ],
    };
  },
  methods: {
    ...mapActions({
      StorePost: "parameters/PostAxios",
    }),
    uploadFormat() {
      var data = new FormData();
      data.append("file", this.file);
      data.append("id", this.id);
      var headers = {
        "Content-Type": "multipart/form-data",
      };
      this.StorePost({
        context: "upload_excel",
        data: data,
        headers: headers,
      }).then(() => {
        this.$emit("editList");
      });
    },
  },
};
</script>
