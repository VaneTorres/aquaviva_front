<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md q-gutter-sm">
        <q-tree
          :nodes="simple"
          dense
          node-key="label"
          v-model:expanded="expanded"
        >
          <template v-slot:body-toggle="prop">
            <p class="text-caption">{{ prop.node.caption }}</p>
            <q-file v-model="file" label="Agregar" style="max-width: 300px">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </template>
        </q-tree>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      file: null,
      expanded: ["Cap_7_Anexos"],
      simple: [
        {
          label: "Cap_1_introducción",
          icon: "folder",
        },
        {
          label: "Cap_2_Antecedentes",
          icon: "folder",
        },
        {
          label: "Cap_3_Aspectos_Tecnicos",
          icon: "folder",
        },
        {
          label: "Cap_4_Programación_Actividades",
          icon: "folder",
        },
        {
          label: "Cap_5_Formatos_Cumplimiento_Ambiental",
          icon: "folder",
        },
        {
          label: "Cap_6_Observaciones_Recomendaciones",
          icon: "folder",
        },
        {
          label: "Cap_7_Anexos",
          icon: "folder",
          body: "toggle",
          children: [
            {
              label: "Anexo1.Reg_Fotografico",
              icon: "folder",
            },
            {
              label: "Anexo2.GDB",
              icon: "folder",
            },
            {
              label: "Anexo3.Rep_Laboratorio",
              icon: "folder",
            },
            {
              label: "Anexo4.Gestion_Ambiental_Social",
              icon: "folder",
            },
            {
              label: "Anexo5.Gestion_Legal",
              icon: "folder",
              children: [
                {
                  label: "5.1 Actos Administrativos",
                  icon: "folder",
                },
              ],
            },
          ],
        },
      ],
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
      /* this.GetProjects(this.address).then((response) => {
            this.optionsProjects = response;
        }); */
    },
  },
  mounted() {
    this.getOptionAddress();
  },
};
</script>
