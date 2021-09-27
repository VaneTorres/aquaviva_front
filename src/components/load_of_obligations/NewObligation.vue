<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >
    <!-- Información general de la ficha -->
    <q-step
      :name="1"
      title="Información general"
      icon="business"
      :done="step > 1"
    >
      <div class="row">
        <q-select
          use-input
          :rules="obligationRule"
          input-debounce="0"
          @filter="filterTool"
          v-model="obligation"
          :options="optionsobligation"
          label="Obligación"
          class="col-md-12 q-pa-sm"
          color="primary"
        />
        <q-input
          v-model="name"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Nombre"
        />
        <q-input
          v-model="code"
          type="text"
          class="col-md-6 q-pa-sm"
          label="Codigo"
        />
        <q-input
          v-model="objetive"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Objetivo"
          autogrow
        >
        </q-input>
        <q-input
          v-model="goal"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Meta"
          autogrow
        >
        </q-input>
        
        <q-input
          v-model="Observations"
          type="textarea"
          class="col-md-12 q-pa-sm"
          label="Observaciones"
          autogrow
        >
        </q-input>
      </div>
    </q-step>
    <!-- Fin información general de la ficha -->
    <!-- Indicadores-->
    <q-step :name="2" title="Indicadores" icon="business" :done="step > 1">
      <div class="row">
        <q-input
          v-model="indicatortype"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Tipo de indicador"
          autogrow
        />
        <q-input
          v-model="indicator"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Indicador"
          autogrow
        />
        <q-input
          v-model="indicatorobjetive"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Objetivo"
          autogrow
        />
        <q-input
          v-model="indicatorgoal"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Meta"
          autogrow
        />
        <q-select
          use-input
          input-debounce="0"
          v-model="indicatorfrequency"
          :options="optionsfrequency"
          label="Freciencia"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-btn
          flat
          dense
          color="primary"
          class="col-md-12 q-pa-sm"
          :disable="loading"
          label="Agregar indicador"
          @click="addIndicator"
        ></q-btn>
      </div>
      <q-table
        :loading="loading"
        :rows="rowsIndicator"
        :columns="columnsIndicator"
        row-key="id"
      >
      </q-table>
    </q-step>
    <!-- Fin Indicadores-->
    <!-- Actividades-->
    <q-step :name="3" title="Actividades" icon="business" :done="step > 2">
      <div class="row">
        <q-input
          v-model="activity"
          type="textarea"
          class="col-md-6 q-pa-sm"
          label="Actividad"
          autogrow
        />
        <q-select
          use-input
          input-debounce="0"
          v-model="editdate"
          :options="optionseditdate"
          label="Fecha editable"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-input
          formatModel="string"
          format="YYYY-MM-DD"
          label="Fecha incial"
          class="col-md-6 q-pa-sm"
          type="date"
          stack-label
          v-model="startdate"
        />
        <q-input
          formatModel="string"
          format="YYYY-MM-DD"
          label="Fecha final"
          class="col-md-6 q-pa-sm"
          type="date"
          stack-label
          v-model="finishdate"
        />
         <q-select
          use-input
          input-debounce="0"
          v-model="money"
          :options="optionsmoney"
          label="Moneda"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-input
          v-model="budget"
          class="col-md-6 q-pa-sm"
          label="Presupuesto"
          mask="###.###.###"
          fill-mask=" "
          reverse-fill-mask
        ></q-input>
       
        <q-select
          use-input
          input-debounce="0"
          v-model="address"
          @filter="filterAddress"
          @update:model-value="UserbyAddress"
          :options="optionsAddress"
          label="Sede"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-select
          use-input
          input-debounce="0"
          @filter="filterResponsable"
          v-model="responsable"
          :options="optionsresponsable"
          label="Responsable"
          class="col-md-6 q-pa-sm"
          color="primary"
        />
        <q-btn
          flat
          dense
          color="primary"
          class="col-md-12 q-pa-sm"
          :disable="loading"
          label="Agregar actividad"
          @click="addActivity"
        ></q-btn>
      </div>
      <q-table :rows="rowsActivity" :columns="columnsActivity" row-key="id">
      </q-table>
    </q-step>
    <!--Fin Actividades-->
    <!-- Acciones -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step != 3 ? true : false"
          @click="$refs.stepper.next()"
          color="primary"
          label="Continuar"
        />
        <q-btn
          v-show="step === 3 ? true : false"
          color="primary"
          label="Finalizar carga de oblicaciones"
          @click="submit()"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Anterior"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
    <!-- Fin acciones -->
  </q-stepper>
</template>
<script>
const stringToolOptions = [];
const stringResponsableOptions = [];
const stringAddressOptions = [];
const columnsIndicator = [
  {
    name: "indicatortype",
    required: true,
    label: "Tipo de indicador",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "indicator",
    align: "center",
    label: "Indicador",
    field: "indicator",
    sortable: true,
  },
  {
    name: "indicatorGoal",
    align: "center",
    label: "Meta",
    field: "indicatorGoal",
    sortable: true,
  },
  {
    name: "indicatorObjetive",
    align: "center",
    label: "Objetivo",
    field: "indicatorObjetive",
    sortable: true,
  },
  {
    name: "indicatorfrequency",
    align: "center",
    label: "Frecuencia",
    field: "indicatorfrequency",
    sortable: true,
  },
];
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
    name: "edit",
    align: "center",
    label: "Fecha editable",
    field: "edit",
    sortable: true,
  },
  {
    name: "activityStart",
    align: "center",
    label: "Fecha inicial",
    field: "activityStart",
    sortable: true,
  },
  {
    name: "activityFinish",
    align: "center",
    label: "Fecha final",
    field: "activityFinish",
    sortable: true,
  },
  {
    name: "activityBudget",
    align: "center",
    label: "Presupuesto",
    field: "activityBudget",
    sortable: true,
  },
];
export default {
  props: {
    id_company: {
      type: Number,
    },
  },
  data() {
    return {
      //model general
      columnsIndicator,
      columnsActivity,
      loading: false,
      step: 1,
      valid: true,
      obligation: null,
      name: null,
      code: null,
      objetive: null,
      goal: null,
      Observations: null,
      optionsobligation: stringToolOptions,
      optionsAddress: stringAddressOptions,
      optionsresponsable: stringResponsableOptions,
      /* model indicador */
      optionsfrequency: [
        "Horario",
        "Diario",
        "Semanal",
        "Mensual",
        "Trimestral",
        "Cuatrimestral",
        "Semestal",
        "Anual",
        "Permanente",
      ],
      indicatortype: null,
      indicator: null,
      indicatorgoal: null,
      indicatorobjetive: null,
      indicatorfrequency: null,
      rowsIndicator: [],
      /* model activity */
      activity: null,
      editdate: null,
      startdate: null,
      finishdate: null,
      budget: null,
      money: null,
      address: null,
      responsable: null,
      rowsActivity: [],
      optionsmoney: ["COP", "USD"],
      optionseditdate: ["Variable", "Fija"],
      //VALIDATE
      obligationRule: [(v) => !!v || "La obligación es requerida."],
    };
  },
  methods: {
    UserbyAddress() {
      var data = { id_address: this.address.id };
      this.$axios
        .post("http://127.0.0.1:8000/api/get_users_by_address", data)
        .then((response) => {
          response.data.forEach((element) => {
            this.optionsresponsable.push({
              label: element.name.toString(),
              value: element.name,
              id: element.id.toString(),
            });
          });
          stringResponsableOptions = this.optionsresponsable;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addIndicator() {
      this.loading = true;
      this.rowsIndicator.push({
        name: this.indicatortype ? this.indicatortype : "No aplica",
        indicator: this.indicator ? this.indicator : "No aplica",
        indicatorGoal: this.indicatorgoal ? this.indicatorgoal : "No aplica",
        indicatorObjetive: this.indicatorobjetive
          ? this.indicatorobjetive
          : "No aplica",
        indicatorfrequency: this.indicatorfrequency
          ? this.indicatorfrequency
          : "No aplica",
      });
      this.indicatortype= null;
      this.indicator= null;
      this.indicatorgoal= null;
      this.indicatorobjetive= null;
      this.indicatorfrequency= null;
      this.loading = false;
    },
    addActivity() {
      this.loading = true;
      this.rowsActivity.push({
        name: this.activity ? this.activity : "No aplica",
        edit: this.editdate ? this.editdate : "No aplica",
        activityStart: this.startdate ? this.startdate : "No aplica",
        activityFinish: this.finishdate
          ? this.finishdate
          : "No aplica",
        activityBudget: this.budget
          ? this.budget
          : "No aplica",
      });
      this.activity= null;
      this.editdate= null;
      this.startdate= null;
      this.finishdate= null;
      this.budget= null;
      this.loading = false;
    },
    //FILTRO DEL SELECT
    filterTool(val, update) {
      if (val === "") {
        update(() => {
          this.optionsobligation = stringToolOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsobligation = stringToolOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterAddress(val, update) {
      if (val === "") {
        update(() => {
          this.optionsAddress = stringAddressOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsAddress = stringAddressOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterResponsable(val, update) {
      if (val === "") {
        update(() => {
          this.optionsresponsable = stringResponsableOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsresponsable = stringResponsableOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
      submit(){
        var data={
          obligation: this.obligation.id,
          obligation_label: this.obligation.label,
          name: this.name,
          code: this.code,
          objetive: this.objetive,
          goal: this.goal,
          address: this.address.id,
          address_label: this.address.label,
          responsable: this.responsable.id,
          responsable_label: this.responsable.label,
          observations: this.Observations,
          activity:this.rowsActivity,
          indicator:this.rowsIndicator
        }
        this.$emit("new", data);
      },
  },
  mounted() {
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .get("http://127.0.0.1:8000/api/get_tools")
      .then((response) => {
        response.data.forEach((element) => {
          this.optionsobligation.push({
            label: element.tool.toString(),
            value: element.tool,
            id: element.id.toString(),
          });
        });
        stringToolOptions = this.optionsobligation;
      })
      .catch((e) => {
        console.log(e);
      });
    this.$axios
      .post("http://127.0.0.1:8000/api/get_address_by_users", data)
      .then((response) => {
        response.data.address.forEach((element) => {
          this.optionsAddress.push({
            label: element.name.toString(),
            value: element.name,
            id: element.id_address.toString(),
          });
        });
        stringAddressOptions = this.optionsAddress;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
