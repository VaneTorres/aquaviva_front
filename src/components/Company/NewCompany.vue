<template>
  <!-- Start stepper -->
  <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >
    <!-- Start Company -->
    <q-step :name="1" title="Empresa" icon="business" :done="step > 1">
      <q-form
        class="row q-col-gutter-sm"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <q-input
          v-model="nit"
          class="col-md-6 col-12"
          :rules="nitRules"
          type="text"
          label="NIT (*)"
          data-vv-scope="formnew"
        />
        <q-input
          v-model="businessName"
          class="col-md-6 col-12"
          :rules="businessNameRules"
          type="text"
          label="Razón social (*)"
          data-vv-scope="formnew"
        />
        <q-select
          v-model="codeCiiu"
          use-input
          class="col-md-6 col-12"
          :rules="codeCiiuRule"
          input-debounce="0"
          :options="options_ciiu"
          @filter="filterCiiu"
          label="Código CIIU (*)"
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
        <q-uploader
          @added="factoryFn"
          :factory="factoryFn"
          class="col-12 q-mt-md"
          :filter="checkFileType"
          label="Cargar Logo (Formato png, jpeg) "
          @rejected="onRejected"
          data-vv-scope="formnew"
        />
      </q-form>
    </q-step>
    <!-- Finish Company -->
    <!-- Start Address  -->
    <q-step
      :name="2"
      title="Sede principal"
      icon="mdi-map-marker"
      :done="step > 1"
    >
      <q-form
        class="row q-col-gutter-sm"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <q-input
          v-model="addressName"
          :rules="addressNameRules"
          type="text"
          class="col-md-6 col-12"
          label="Nombre  (*)"
        />
        <q-input
          v-model="description"
          :rules="descriptionRules"
          class="col-md-6 col-12"
          autogrow
          label="Descripción  (*)"
        />
        <q-select
          use-input
          :rules="townRule"
          input-debounce="0"
          @filter="filterTown"
          v-model="town"
          :options="options_town"
          label="Municipio  (*)"
          class="col-md-6 col-12"
          color="primary"
        />
        <q-input
          v-model="address"
          :rules="addressRules"
          type="text"
          class="col-md-6 col-12"
          label="Dirección (*)"
        />
        <q-input
          v-model="phone"
          :rules="phoneRules"
          class="col-md-6 col-12"
          type="text"
          label="Teléfono (*)"
        />
        <q-input
          v-model="contact"
          :rules="contactRules"
          class="col-md-6 col-12"
          type="text"
          label="Responsable (*)"
        />
      </q-form>
    </q-step>
    <!-- Finish Address  -->
    <!-- Start Admin  -->
    <q-step :name="3" title="Administrador" icon="person" :done="step > 2">
      <q-form
        class="row q-col-gutter-sm"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <q-select
          v-model="type_document"
          :options="options_type_document"
          :rules="typeDocumentRules"
          color="primary"
          label="Tipo de documento (*)"
          class="col-md-6 col-12"
        />
        <q-input
          v-model="numberIdentification"
          :rules="numberIdentificationRules"
          type="text"
          label="Número de identificación (*)"
          class="col-md-6 col-12"
        />
        <q-input
          v-model="name"
          :rules="nameRules"
          type="text"
          label="Nombre(s) y apellido(s) (*)"
          class="col-md-6 col-12"
        />
        <q-input
          v-model="mobile"
          :rules="mobileRules"
          type="text"
          label="Número de celular (*)"
          class="col-md-6 col-12"
        />
        <q-input
          v-model="email"
          :rules="emailRules"
          type="text"
          label="Correo electrónico (*)"
          class="col-md-6 col-12"
        />
      </q-form>
    </q-step>
    <!-- Finish Admin  -->
    <!-- Button action  -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          v-show="step != 3 ? true : false"
          @click="next()"
          class="float-right q-my-md"
          color="primary"
          label="Continuar"
        />
        <q-btn
          v-show="step === 3 ? true : false"
          @click="submit()"
          class="float-right q-my-md"
          color="primary"
          label="Registrar"
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
  </q-stepper>
</template>
<script>
import { mapActions } from "vuex";
const stringCiiuOptions = [];
const stringTownOptions = [];

export default {
  data() {
    return {
      //MODEL-VALUE
      step: 1,
      valid: true,
      nit: null,
      codeCiiu: null,
      logo: null,
      addressName: null,
      description: null,
      town: null,
      address: null,
      phone: null,
      mobile: null,
      contact: null,
      type_document: null,
      numberIdentification: null,
      name: null,
      numberCel: null,
      email: null,
      businessName: null,
      options_ciiu: stringCiiuOptions,
      options_town: stringTownOptions,
      options_type_document: [],
      //VALIDATE
      nitRules: [(v) => !!v || "El NIT es requerido."],
      businessNameRules: [(v) => !!v || "La razón social es requerida."],
      codeCiiuRule: [(v) => !!v || "El código CIIU es requerido."],
      townRule: [(v) => !!v || "El municipio es requerido."],
      addressNameRules: [(v) => !!v || "El nombre de la sede es requerida."],
      descriptionRules: [
        (v) => !!v || "La descripción de la sede es requerida.",
      ],
      addressRules: [(v) => !!v || "La dirección de la sede es requerida."],
      phoneRules: [
        (v) => !!v || "El teléfono de la sede es requerido.",
        (v) =>
          v.length <= 10 ||
          "El teléfono de la sede debe de ser máximo de 10 caracteres.",
        (v) =>
          v.length >= 7 ||
          "El teléfono de la sede debe de ser mínimo de 7 caracteres.",
        (v) =>
          /^[0-9]+$/i.test(v) || "El teléfono de la sede no debe tener letras.",
      ],
      contactRules: [(v) => !!v || "El responsable es requerido."],
      numberIdentificationRules: [
        (v) => !!v || "El número de identificación es requerido.",
      ],
      typeDocumentRules: [(v) => !!v || "El tipo de documento es requerido."],

      nameRules: [(v) => !!v || "Los nombres y apellidos son requeridos."],
      mobileRules: [
        (v) => !!v || "El número de celular es requerido.",
        (v) =>
          v.length <= 10 ||
          "El número de celular debe de ser máximo de 10 caracteres.",
        (v) =>
          v.length >= 7 ||
          "El número de celular debe de ser mínimo de 7 caracteres.",
        (v) =>
          /^[0-9]+$/i.test(v) || "El número de celular no debe tener letras",
      ],
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido.",
        (v) =>
          !!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            v
          ) || "El correo electrónico no es válido.",
      ],
    };
  },
  methods: {
    /* VUEX */
    ...mapActions({
      GetTown: "parameters/GetTown",
      GetCiiu: "parameters/GetCiiu",
      GetDocumentTypes: "parameters/GetDocumentTypes",
      StorePost: "parameters/PostAxios",
    }),
    /* Validar formulario antes de mostrar el siguiente proceso */
    async next() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        this.$refs.stepper.next();
      }
    },
    /* Fin validar formulario antes de mostrar el siguiente proceso */

    async submit() {
      /* Validar formulario */
      const isValid = await this.$refs.form.validate();

      if (isValid) {
        /* Metodo que envia formulario */
        var address = {
          addressName: this.addressName,
          address: this.address,
          phone: this.phone,
          contact: this.contact,
          description: this.description,
          town: this.town.id,
          type_address: "Principal",
        };
        var user = {
          document_type: this.type_document.id,
          document: this.numberIdentification,
          name: this.name,
          mobile: this.mobile,
          email: this.email,
        };
        const data = new FormData();
        data.append("logo", this.logo);
        data.append("nit", this.nit);
        data.append("name", this.businessName);
        data.append("codeCiiu", this.codeCiiu.id);
        data.append("address", JSON.stringify(address));
        data.append("user", JSON.stringify(user));
        var headers = {
          "Content-Type": "multipart/form-data",
        };
        /* Guardar empresa */
        this.StorePost({
          context: "company_creation",
          data: data,
          headers: headers,
        })
          .then(() => {
            this.$emit("new");
          })
          .catch((e) => {
            if (e.data.code == 402) {
              this.emailRules.push(
                (v) =>
                  e.data.code != 402 ||
                  "Este correo " + this.email + " ya existe."
              );
              this.submit();
              this.emailRules.pop();
            }
          });
        /* Fin guardar empresa */
      }
    },
    /* Validación de imagen */
    checkFileType(files) {
      return files.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `¡Formato no válido! por favor revise el formato del archivo`,
      });
    },
    /* Fin validación de imagen */
    /* Guardar imagen */
    factoryFn(file) {
      this.logo = file[0];
    },
    /* Fin guardar imagen */
    /* Flitro en los select */
    filterCiiu(val, update) {
      if (val === "") {
        update(() => {
          this.options_ciiu = stringCiiuOptions[0];
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        if (!isNaN(needle)) {
          this.options_ciiu = stringCiiuOptions[0].filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.options_ciiu = stringCiiuOptions[0].filter(
            (v) => v.description.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    filterTown(val, update) {
      if (val === "") {
        update(() => {
          this.options_town = stringTownOptions[0];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options_town = stringTownOptions[0].filter(
          (v) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    /* Llenar select Ciiu */
    this.GetCiiu().then((response) => {
      stringCiiuOptions.push(response);
    });
    /* Fin llenar select Ciiu */
    /* llenar select municipios */
    this.GetTown().then((response) => {
      stringTownOptions.push(response);
    });
    /* Fin llenar select municipios */
    /* llenar select tipos de documentos */
    this.GetDocumentTypes().then((response) => {
      this.options_type_document = response;
    });
    /* Fin llenar select tipos de documentos */
  },
};
</script>
