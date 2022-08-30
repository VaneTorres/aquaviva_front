<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top>
          <q-btn
            :disable="loading"
            round
            color="primary"
            icon="add"
            @click="newFormat = true"
          >
            <q-tooltip>Añadir formato</q-tooltip>
          </q-btn>
          <q-space />
          <q-input
            outlined
            dense
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :text-color="props.row.status == 'Finalizado' ? 'white' : 'black'"
              class="text-caption text-weight-medium"
              :color="
                props.row.status == 'Creado'
                  ? 'accent'
                  : props.row.status == 'Finalizado'
                  ? 'negative'
                  : 'primary'
              "
              >{{ props.row.status }}</q-badge
            >
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="secondary"
              icon-right="mdi-file-download-outline"
              no-caps
              flat
              dense
              @click="downloadFormat(props.row.excel)"
            >
              <q-tooltip>Descargar formato</q-tooltip>
            </q-btn>
            <q-btn
              color="primary"
              icon-right="mdi-file-upload-outline"
              v-if="props.row.status != 'Finalizado'"
              no-caps
              flat
              dense
              @click="action(props.row.id, 'upload')"
            >
              <q-tooltip>Subir formato</q-tooltip>
            </q-btn>
            <q-btn
              color="primary"
              icon-right="mdi-check-bold"
              v-if="props.row.status != 'Finalizado'"
              no-caps
              flat
              dense
              @click="action(props.row.id, 'finish')"
            >
              <q-tooltip>Cambiar estado a finalizado</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="newFormat">
        <NewFormat v-on:editList="UpdateList" />
      </q-dialog>
      <q-dialog v-model="uploadFormat">
        <UploadFormat v-on:editList="UpdateList" :id="id" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NewFormat from "src/components/formatSIG/NewFormat.vue";
import UploadFormat from "src/components/formatSIG/UploadFormat.vue";
import { S3 } from "@aws-sdk/client-s3";
import { mapActions } from "vuex";
const columns = [
  {
    name: "project",
    required: true,
    label: "PROYECTO",
    align: "center",
    field: (row) => row.project,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "medium",
    align: "center",
    label: "MEDIO",
    field: "medium",
    sortable: true,
  },
  {
    name: "component",
    align: "center",
    label: "COMPONENTE",
    field: "component",
    sortable: true,
  },
  {
    name: "format",
    align: "center",
    label: "FORMATO",
    field: "format",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
  },
  { name: "action", label: "ACCIÓN", field: "action", align: "center" },
];
/* const aws = require("aws-sdk"); */
const originalRows = [];

export default {
  components: {
    NewFormat,
    UploadFormat,
  },
  data() {
    return {
      newFormat: false,
      uploadFormat: false,
      columns,
      rows: originalRows,
      id: 0,
      loading: false,
      filter: "",
      rowCount: 10,
    };
  },
  methods: {
    ...mapActions({
      GetAxios: "parameters/GetAxios",
      StorePost: "parameters/PostAxios",
    }),
    UpdateList() {
      this.loading = true;
      this.GetAxios({ context: "get_excel_companies" })
        .then((response) => {
          this.rows = response.data.excels;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    downloadFormat(link) {
      this.StorePost({ context: "download_files", data: { excel: link } })
        .then((response) => {
          window.open("http://127.0.0.1:8000/" + response.data, "_blank");
        })
        .catch((e) => {
          console.log(e);
        });
      /* S3.config.update({
        region: "us-east-1",
        accessKeyId: "AKIAQVBD44LUO5575MOL",
        secretAccessKey: "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",
      }); */
      /*       const s3 = new S3.S3();
      const params = {
        Bucket: "aquaviva",
        Key: "excel/" + link + ".xlsx",
      };
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          const file = new Blob([data.Body], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = URL.createObjectURL(file);
          window.open(url);
        }
      }); */
      /*    const s3Client = new S3({
        endpoint: "http://s3.amazonaws.com/aquaviva/",
        region: "us-east-2",
        credentials: {
          accessKeyId: "AKIAQVBD44LUO5575MOL",
          secretAccessKey: "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",
        },
      }); */
      /* const s3Client = new S3(); */
      /*   s3Client.getObject({
        Bucket: "aquaviva",
        disk: "s3",
        Key: "excel/" + link + ".xlsx",
        function(error, data) {
          console.log(error);
          console.log(data);
          if (error != null) {
            alert("Failed to retrieve an object: " + error);
          } else {
            alert("Loaded " + data.ContentLength + " bytes");
          }
        },
      }); */
    },
    action(id, action) {
      if (action == "upload") {
        this.uploadFormat = true;
        this.id = id;
      } else {
        this.StorePost({
          context: "set_status_format",
          data: {
            id_excel: id,
          },
        }).then(() => {
          this.rows.filter((row) => {
            if (row.id == id) {
              row.status = "Finalizado";
            }
          });
        });
      }
    },
  },

  created() {
    this.UpdateList();
  },
};
</script>
