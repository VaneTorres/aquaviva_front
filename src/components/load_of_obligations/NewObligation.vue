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
          v-model="projectMonitoring"
          use-input
          class="col-md-6 col-12"
          :rules="projectMonitoringRule"
          input-debounce="0"
          :options="optionsprojectMonitoring"
          @filter="filterProjectMonitoring"
          label="Proyecto de monitoreo (*)"
          color="primary"
          data-vv-scope="formnew"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >No hay resultados
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="phase"
          use-input
          class="col-md-6 col-12"
          input-debounce="0"
          :rules="phaseRule"
          :options="optionsphase"
          label="Tipo de fase (*)"
          color="primary"
          data-vv-scope="formnew"
        >
        </q-select>
        <q-select
          use-input
          :rules="mediumsRule"
          input-debounce="0"
          @filter="filtermediums"
          v-model="mediums"
          :options="optionmediums"
          label="Medio (*)"
          class="col-md-6 col-12"
          color="primary"
        />
        <q-select
          v-model="program"
          use-input
          class="col-md-6 col-12"
          :rules="programRule"
          input-debounce="0"
          :options="options_program"
          @filter="filterProgram"
          @update:model-value="(v) => listProject(v.id)"
          label="Programa (*)"
          color="primary"
          data-vv-scope="formnew"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >No hay resultados
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="project"
          use-input
          class="col-md-6 col-6"
          input-debounce="0"
          :options="optionsproject"
          @filter="filterProject"
          label="Proyecto"
          color="primary"
          data-vv-scope="formnew"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >No hay resultados
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="obligation"
          use-input
          class="col-md-6 col-12"
          :rules="obligationRule"
          input-debounce="0"
          :options="optionsobligation"
          @filter="filterTool"
          label="Obligación (*)"
          color="primary"
          data-vv-scope="formnew"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >No hay resultados
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          autogrow
          v-model="name"
          type="textarea"
          class="col-md-6 col-12"
          label="Nombre"
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
          class="col-md-6 col-12"
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
          class="col-md-6 col-12"
          type="date"
          stack-label
          v-model="startdate"
        />
        <q-input
          formatModel="string"
          format="YYYY-MM-DD"
          label="Fecha final"
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
          class="float-right q-my-md"
        />
        <q-btn
          v-show="step === 3 ? true : false"
          color="primary"
          label="Finalizar carga de oblicaciones"
          @click="submit()"
          class="float-right q-my-md"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Anterior"
          class="q-ml-sm float-right q-my-md"
        />
      </q-stepper-navigation>
    </template>
    <!-- Fin acciones -->
  </q-stepper>
</template>
<script>
import { mapActions } from "vuex";
var stringToolOptions = [];
var stringResponsableOptions = [];
var stringAddressOptions = [];
const stringProgramOptions = [];
const stringProjectMonitoringOptions = [];
const stringmediumsOptions = [];
const stringProjectOptions = [];
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
      project: null,
      name: null,
      objetive: null,
      goal: null,
      observations: null,
      program: null,
      mediums: null,
      projectMonitoring: null,
      phase: null,
      optionsphase: ["Constructiva", "Operativa"],
      options_program: stringProgramOptions,
      optionsprojectMonitoring: stringProjectMonitoringOptions,
      optionsobligation: stringToolOptions,
      optionsproject: stringProjectOptions,
      optionsAddress: stringAddressOptions,
      optionsresponsable: stringResponsableOptions,
      optionmediums: stringmediumsOptions,
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
      projectMonitoringRule: [
        (v) => !!v || "El proyecto monitoreo ambiental es requerido.",
      ],
      phaseRule: [(v) => !!v || "La fase es requeria."],
      programRule: [(v) => !!v || "El programa es requerido."],
      obligationRule: [(v) => !!v || "La obligación es requerida."],
      mediumsRule: [(v) => !!v || "El medio es requerida."],
      /* dateInitialRules: [
        (v) =>
          v >= today ||
          "La fecha final tiene que ser mayor a la fecha actual " + today + ".",
      ], */
      /*  dateFinalRules: [
        (v) =>
          v > this.startdate ||
          "La fecha final tiene que ser mayor de la fecha inicial.",
      ], */
    };
  },
  methods: {
    ...mapActions({
      GetProgram: "parameters/GetProgram",
      GetTool: "parameters/GetTool",
      GetAddress: "parameters/GetAddress",
      GetAxios: "parameters/GetAxios",
      GetMedium: "parameters/GetMedium",
      StorePost: "parameters/PostAxios",
    }),
    /* Consulta los proyectos por el programa seleccionado */
    listProject(id) {
      this.optionsproject = [];
      this.StorePost({
        context: "get_projects_by_programs",
        data: { id_program: id },
      }).then((response) => {
        response.data.projects.forEach((element) => {
          this.optionsproject.push({
            label: element.name.toString(),
            id: element.id.toString(),
          });
        });
      });
    },
    //Filtros de select
    filtermediums(val, update) {
      if (val === "") {
        update(() => {
          this.optionmediums = stringmediumsOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionmediums = stringmediumsOptions[0].filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterTool(val, update) {
      if (val === "") {
        update(() => {
          this.optionsobligation = stringToolOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsobligation = stringToolOptions[0].filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterProjectMonitoring(val, update) {
      if (val === "") {
        update(() => {
          this.optionsprojectMonitoring = stringProjectMonitoringOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsprojectMonitoring = stringProjectMonitoringOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterProgram(val, update) {
      if (val === "") {
        update(() => {
          this.options_program = stringProgramOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options_program = stringProgramOptions[0].filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterProject(val, update) {
      if (val === "") {
        update(() => {
          this.optionsproject = stringProjectOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsproject = stringProjectOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterAddress(val, update) {
      if (val === "") {
        update(() => {
          this.optionsAddress = stringAddressOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsAddress = stringAddressOptions[0].filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    /* Consulta los usuarios una vez seleccione la sede */
    UserbyAddress() {
      var data = { id_address: this.address.id };
      this.StorePost({ context: "get_users_by_address", data: data })
        .then((response) => {
          response.data.forEach((element) => {
            this.optionsresponsable.push({
              label: element.name.toString(),
              value: element.name,
              id: element.id.toString(),
            });
          });
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

    /* Registrar oblicación */
    submit() {
      var data = {
        phase: this.phase,
        enviorenmental_monitoring: this.projectMonitoring.id,
        id_tool: this.obligation.id,
        name: this.name,
        objetive: this.objetive,
        target: this.goal,
        observations: this.observations,
        indicator: this.rowsIndicator,
        activity: this.rowsActivity,
      };
      data.group = this.project != null ? "project" : "program";
      data.id_group = this.project != null ? this.project.id : this.program.id;
      this.StorePost({
        context: "create_worksheets",
        data: data,
      }).then((response) => {
        this.$emit("new");
      });
    },
  },
  mounted() {
    /* Vaciar los select del componente*/
    this.optionsmoney = [];

    this.GetAxios({
      context: "get_projects",
    }).then((response) => {
      response.data.forEach((element) => {
        this.optionsprojectMonitoring.push({
          label: element.project.toString(),
          id: element.id.toString(),
        });
      });
    });
    /*Trae las monedas registradas*/
    this.GetAxios({
      context: "get_currencies",
    }).then((response) => {
      response.data.forEach((element) => {
        this.optionsmoney.push({
          label: element.currency.toString(),
          value: element.currency,
          id: element.id.toString(),
        });
      });
    });

    /*Trae las obligaciones*/
    this.GetTool().then((response) => {
      stringToolOptions.push(response);
    });
    /* llenar select programas */
    this.GetProgram().then((response) => {
      stringProgramOptions.push(response);
    });
    /* Fin llenar select programas */
    this.GetMedium().then((response) => {
      stringmediumsOptions.push(response);
    });
    /*Trae las sedes del usuario logueado*/
    this.GetAddress().then((response) => {
      stringAddressOptions.push(response);
    });
  },
};
</script>
