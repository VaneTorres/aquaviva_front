<template>
  <q-card style="max-width: 800px">
    <q-card-section class="row items-center q-pb-none"> </q-card-section>
    <q-card-section>
      <q-btn icon="close" flat round dense v-close-popup class="float-right" />
      <q-tabs v-model="tab" class="text-primary">
        <q-tab name="general" icon="mail" label="Información" />
        <q-tab name="indicator" icon="alarm" label="Indicador" />
        <q-tab name="activities" icon="movie" label="Actividad" />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="general">
          <div class="row">
            <div class="col-md-6">
              <div class="text-subtitle2">Proyecto de monitoreo:</div>
              {{ data.enviorenmental_monitoring }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Obligación:</div>
              {{ data.tool }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Tipo de fase:</div>
              {{ data.phase }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Programa ambiental:</div>
              {{ data.program }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Proyecto ambiental:</div>
              {{ data.project != null ? data.project : "No aplica" }}
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="row">
            <div class="col-md-6">
              <div class="text-subtitle2">Nombre o titulo de la ICA:</div>
              {{ data.name != null ? data.name : "No aplica" }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Objetivo:</div>
              {{ data.objective != null ? data.objective : "No aplica" }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Meta:</div>
              {{ data.target != null ? data.target : "No aplica" }}
            </div>
            <div class="col-md-6">
              <div class="text-subtitle2">Observaciones:</div>
              {{ data.observations != null ? data.observations : "No aplica" }}
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="indicator">
          <div class="text-h6 text-center">INDICADORES</div>
          <q-table
            :loading="loading"
            :rows="rowsIndicator"
            :columns="columnsIndicator"
            row-key="id"
          >
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="activities">
          <div class="text-h6 text-center">ACTIVIDADES</div>
          <q-table :rows="rowsActivity" :columns="columnsActivity" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
/* Columnas tabla de indicadores */
const columnsIndicator = [
  {
    name: "name",
    align: "center",
    label: "Indicador",
    field: "name",
    sortable: true,
  },
  {
    name: "target",
    align: "center",
    label: "Meta",
    field: "target",
    sortable: true,
  },
  {
    name: "objective",
    align: "center",
    label: "Objetivo",
    field: "objective",
    sortable: true,
  },
  {
    name: "frequency",
    align: "center",
    label: "Frecuencia",
    field: "frequency",
    sortable: true,
  },
];
/* Columnas tabla de actividades */
const columnsActivity = [
  {
    name: "activity",
    required: true,
    label: "Actividad",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "Fecha editable",
    field: "type",
    sortable: true,
  },
  {
    name: "initial_date",
    align: "center",
    label: "Fecha inicial",
    field: "initial_date",
    sortable: true,
  },
  {
    name: "final_date",
    align: "center",
    label: "Fecha final",
    field: "final_date",
    sortable: true,
  },
  {
    name: "estimated_budget",
    align: "center",
    label: "Presupuesto",
    field: "estimated_budget",
    sortable: true,
  },
  {
    name: "currency",
    align: "center",
    label: "Moneda",
    field: "currency",
    sortable: true,
  },
  {
    name: "responsible",
    align: "center",
    label: "Responsable",
    field: "responsible",
    sortable: true,
  },
];
export default {
  data() {
    return {
      tab: "general",
      columnsIndicator,
      columnsActivity,
      rowsActivity: [],
      rowsIndicator: [],
      loading: false,
    };
  },
  props: {
    data: Object,
  },
  methods: {
    ...mapActions({
      StorePost: "parameters/PostAxios",
    }),
  },

  mounted() {
    /* llena la tabla de indicadores */
    this.StorePost({
      context: "get_indicators",
      data: { id_worksheet: this.data.id_worksheet },
    }).then((response) => {
      this.rowsIndicator = response.data;
    });
    /* Llena la tabla de actividades */
    this.StorePost({
      context: "get_activities",
      data: { id_worksheet: this.data.id_worksheet },
    }).then((response) => {
      this.rowsActivity = response.data;
      this.rowsActivity.forEach((element) => {
        element.responsible = "";
        element.responsibles.forEach((elementResponse) => {
          element.responsible += elementResponse.name + ", ";
        });
        element.responsible = element.responsible.substring(
          0,
          element.responsible.length - 1
        );
      });
    });
  },
};
</script>
<style>
.q-stepper {
  box-shadow: none !important;
}
</style>
