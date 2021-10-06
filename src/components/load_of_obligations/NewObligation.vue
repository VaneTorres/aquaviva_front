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
      <div class="row q-col-gutter-sm">
        <q-select
          use-input
          :rules="obligationRule"
          input-debounce="0"
          @filter="filterTool"
          v-model="obligation"
          :options="optionsobligation"
          label="Obligación"
          class="col-md-12 col-12"
          color="primary"
        />
        <q-input
          v-model="name"
          type="text"
          class="col-md-6 col-12"
          label="Nombre"
        />
        <q-input
          v-model="code"
          type="text"
          class="col-md-6 col-12"
          label="Código"
        />
        <q-input
          v-model="objetive"
          type="textarea"
          class="col-md-6 col-12"
          label="Objetivo"
          autogrow
        >
        </q-input>
        <q-input
          v-model="goal"
          type="textarea"
          class="col-md-6 col-12"
          label="Meta"
          autogrow
        >
        </q-input>

        <q-input
          v-model="observations"
          type="textarea"
          class="col-md-12 col-12"
          label="Observaciones"
          autogrow
        >
        </q-input>
      </div>
    </q-step>
    <!-- Fin información general de la ficha -->
    <!-- Indicadores-->
    <q-step :name="2" title="Indicadores" icon="business" :done="step > 1">
      <div class="row q-col-gutter-md">
        <q-input
          v-model="indicator"
          type="textarea"
          class="col-md-6 col-12"
          label="Indicador"
          autogrow
        />
        <q-input
          v-model="indicatorobjective"
          type="textarea"
          class="col-md-6 col-12"
          label="Objetivo"
          autogrow
        />
        <q-input
          v-model="indicatorgoal"
          type="textarea"
          class="col-md-6 col-12"
          label="Meta"
          autogrow
        />
        <q-select
          use-input
          input-debounce="0"
          v-model="indicatorfrequency"
          :options="optionsfrequency"
          label="Frecuencia"
          class="col-md-6 col-12"
          color="primary"
        />
        <q-btn
          flat
          dense
          color="primary"
          class="col-md-12 col-12 q-my-md"
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
      <div class="row q-col-gutter-md">
        <q-input
          v-model="activity"
          type="textarea"
          class="col-md-6 col-12"
          label="Actividad"
          autogrow
        />
        <q-select
          use-input
          input-debounce="0"
          v-model="editdate"
          :options="optionseditdate"
          label="Fecha editable"
          class="col-md-6 col-12"
          color="primary"
        />
        <q-input
          formatModel="string"
          format="YYYY-MM-DD"
          label="Fecha inicial"
          :rules="dateInitialRules"
          class="col-md-6 col-12"
          type="date"
          stack-label
          v-model="startdate"
        />
        <q-input
          formatModel="string"
          format="YYYY-MM-DD"
          label="Fecha final"
          :rules="dateFinalRules"
          class="col-md-6 col-12"
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
          class="col-md-6 col-12"
          color="primary"
        />
        <q-input
          v-model="budget"
          class="col-md-6 col-12"
          label="Presupuesto"
          mask="###.##"
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
          class="col-md-6 col-12"
          color="primary"
        />
        <q-select
          use-input
          input-debounce="0"
          multiple
          @filter="filterResponsable"
          v-model="responsable"
          :options="optionsresponsable"
          label="Responsable"
          class="col-md-6 col-12"
          color="primary"
        />
        <q-btn
          flat
          dense
          color="primary"
          class="col-md-12 col-12 q-my-md"
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
var stringToolOptions = [];
var stringResponsableOptions = [];
var stringAddressOptions = [];
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
    name: "activitymoney",
    align: "center",
    label: "Moneda",
    field: "activitymoney",
    sortable: true,
  },
  {
    name: "activityperson",
    align: "center",
    label: "Responsable",
    field: "activityperson",
    sortable: true,
  },
];
/* Fecha actual */
var f = new Date();
var today = f.getFullYear() + "-" + (f.getMonth() + 1) + "-0" + f.getDate();
export default {
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
      observations: null,
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
      indicator: null,
      indicatorgoal: null,
      indicatorobjective: null,
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
      optionsmoney: [],
      optionseditdate: ["Variable", "Fija"],
      //Validaciones
      obligationRule: [(v) => !!v || "La obligación es requerida."],
      dateInitialRules: [
        (v) =>
          v >= today ||
          "La fecha final tiene que ser mayor a la fecha actual " + today + ".",
      ],
      dateFinalRules: [
        (v) =>
          v > this.startdate ||
          "La fecha final tiene que ser mayor de la fecha inicial.",
      ],
    };
  },
  methods: {
    /* Consulta los usuarios una vez seleccione la sede */
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
    /* Agrega el indicador */
    addIndicator() {
      this.loading = true;
      this.rowsIndicator.push({
        name: this.indicator ? this.indicator : null,
        target: this.indicatorgoal ? this.indicatorgoal : null,
        objective: this.indicatorobjective ? this.indicatorobjective : null,
        frequency: this.indicatorfrequency ? this.indicatorfrequency : null,
      });
      this.indicator = null;
      this.indicatorgoal = null;
      this.indicatorobjective = null;
      this.indicatorfrequency = null;
      this.loading = false;
    },
    /* Agrega la acrividad */
    addActivity() {
      var stringResponsable = "";
      if (Array.isArray(this.responsable)) {
        this.responsable.forEach((element) => {
          stringResponsable += element.label + ", ";
        });
      }
      this.loading = true;
      this.rowsActivity.push({
        name: this.activity ? this.activity : null,
        type: this.editdate ? this.editdate : null,
        initial_date: this.startdate ? this.startdate : null,
        final_date: this.finishdate ? this.finishdate : null,
        activitymoney: this.money != null ? this.money.label : null,
        id_currency: this.money,
        estimated_budget: this.budget ? this.budget : null,
        activityperson: Array.isArray(this.responsable)
          ? stringResponsable
          : "",
        user: this.responsable,
      });
      this.activity = null;
      this.editdate = null;
      this.startdate = null;
      this.finishdate = null;
      this.budget = null;
      this.responsable = null;
      this.money = null;
      this.loading = false;
    },
    //Filtros de select
    filterTool(val, update) {
      update(() => {
        this.optionsobligation = this.filter(
          val,
          this.optionsobligation,
          stringToolOptions
        );
      });
    },
    filterAddress(val, update) {
      update(() => {
        this.optionsAddress = this.filter(
          val,
          this.optionsAddress,
          stringAddressOptions
        );
      });
    },
    filterResponsable(val, update) {
      update(() => {
        this.optionsresponsable = this.filter(
          val,
          this.optionsresponsable,
          stringResponsableOptions
        );
      });
    },
    filter(val, options, stringOptions) {
      var options_data = options;
      if (val === "") {
        options_data = stringOptions;
      } else {
        const needle = val.toLowerCase();
        options_data = stringOptions.filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      }
      return options_data;
    },
    /* Registrar oblicación */
    submit() {
      var data = {
        id_tool: this.obligation.id,
        tool_label: this.obligation.label,
        code: this.code,
        name: this.name,
        objetive: this.objetive,
        target: this.goal,
        observations: this.observations,
        indicator: this.rowsIndicator,
        activity: this.rowsActivity,
      };
      this.$axios
        .post("http://127.0.0.1:8000/api/create_worksheets", data)
        .then((response) => {
          this.$q.notify({
            message: this.obligation.label + "Se ha registrado con exito.",
            type: "negative",
          });
          this.$emit("new", data);
        })
        .catch((e) => {
          console.log(e);
        });
      /* this.$emit("new", data); */
    },
  },
  created() {
    /* Vaciar los select del componente*/
    this.optionsmoney = [];
    stringToolOptions = [];
    stringAddressOptions = [];
    /*Trae las monedas registradas*/
    this.$axios
      .get("http://127.0.0.1:8000/api/get_currencies")
      .then((response) => {
        response.data.forEach((element) => {
          this.optionsmoney.push({
            label: element.currency.toString(),
            value: element.currency,
            id: element.id.toString(),
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
    /*Trae las obligaciones*/
    this.$axios
      .get("http://127.0.0.1:8000/api/get_tools")
      .then((response) => {
        response.data.forEach((element) => {
          stringToolOptions.push({
            label: element.tool.toString(),
            value: element.tool,
            id: element.id.toString(),
          });
        });
        this.optionsobligation = stringToolOptions;
      })
      .catch((e) => {
        console.log(e);
      });
    /*Trae las sedes del usuario logueado*/
    var data = {
      id_user: this.$q.localStorage.getItem("USER"),
    };
    this.$axios
      .post("http://127.0.0.1:8000/api/get_address_by_users", data)
      .then((response) => {
        response.data.address.forEach((element) => {
          stringAddressOptions.push({
            label: element.name.toString(),
            value: element.name,
            id: element.id_address.toString(),
          });
        });
        this.optionsAddress = stringAddressOptions;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
