<template>
  <!-- Card con información de la empresa -->
  <q-card v-if="info != null" style="width: 700px">
    <q-card-section>
      <q-btn icon="close" flat round dense v-close-popup class="float-right" />
      <q-splitter>
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-primary">
            <q-tab name="company" icon="business" label="Empresa" />
            <q-tab name="address" icon="mdi-map-marker" label="Sede" />
            <q-tab
              name="admin"
              icon="person"
              label="Usuario"
              v-if="info.admin != null"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="company">
              <q-form
                v-model="valid"
                id="formCompany"
                lazy-validation
                @submit.prevent="editCompany"
              >
                <div class="row q-col-gutter-sm">
                  <q-input
                    v-model="info.nit"
                    class="col-md-6 col-12"
                    :rules="nitRules"
                    type="text"
                    label="NIT (*)"
                    data-vv-scope="formnew"
                  />
                  <q-input
                    v-model="info.name"
                    class="col-md-6 col-12"
                    :rules="businessNameRules"
                    type="text"
                    label="Razón social (*)"
                    data-vv-scope="formnew"
                  />
                  <q-select
                    v-model="info.ciiu"
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
                          <q-item-label caption>{{
                            scope.opt.description
                          }}</q-item-label>
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
                </div>
                <q-btn
                  type="submit"
                  color="primary"
                  label="Enviar"
                  form="formCompany"
                  class="q-mt-md float-right"
                />
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="address">
              <q-form
                v-model="valid"
                id="formAddress"
                lazy-validation
                @submit.prevent="editAddress"
              >
                <div class="row q-col-gutter-sm">
                  <q-input
                    v-model="info.name_sede"
                    :rules="addressNameRules"
                    type="text"
                    class="col-md-6 col-12"
                    label="Nombre  (*)"
                  />
                  <q-input
                    v-model="info.address_description"
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
                    v-model="info.town"
                    :options="options_town"
                    label="Municipio  (*)"
                    class="col-md-6 col-12"
                    color="primary"
                  />
                  <q-input
                    v-model="info.address"
                    :rules="addressRules"
                    type="text"
                    class="col-md-6 col-12"
                    label="Dirección (*)"
                  />
                  <q-input
                    v-model="info.phone"
                    :rules="phoneRules"
                    class="col-md-6 col-12"
                    type="text"
                    label="Teléfono (*)"
                  />
                  <q-input
                    v-model="info.contact_person"
                    :rules="contactRules"
                    class="col-md-6 col-12"
                    type="text"
                    label="Responsable (*)"
                  />
                </div>

                <q-btn
                  type="submit"
                  color="primary"
                  label="Enviar"
                  form="formAddress"
                  class="q-mt-md float-right"
                />
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="admin" v-if="info.admin != null">
              <q-form
                v-model="valid"
                id="formAdmin"
                lazy-validation
                @submit.prevent="editAdmin"
              >
                <div class="row q-col-gutter-sm">
                  <q-select
                    v-model="info.admin.document_type"
                    :options="options_type_document"
                    :rules="typeDocumentRules"
                    color="primary"
                    label="Tipo de documento (*)"
                    class="col-md-6 col-12"
                  />
                  <q-input
                    v-model="info.admin.document"
                    :rules="numberIdentificationRules"
                    type="text"
                    label="Número de identificación (*)"
                    class="col-md-6 col-12"
                  />
                  <q-input
                    v-model="info.admin.name"
                    :rules="nameRules"
                    type="text"
                    label="Nombre(s) y apellido(s) (*)"
                    class="col-md-6 col-12"
                  />
                  <q-input
                    v-model="info.admin.mobile"
                    :rules="mobileRules"
                    type="text"
                    label="Número de celular (*)"
                    class="col-md-6 col-12"
                  />
                  <q-input
                    v-model="info.admin.email"
                    :rules="emailRules"
                    type="text"
                    label="Correo electrónico (*)"
                    class="col-md-6 col-12"
                  />
                </div>
                <q-btn
                  type="submit"
                  color="primary"
                  label="Enviar"
                  form="formAdmin"
                  class="q-mt-md float-right"
                />
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card-section>
  </q-card>
  <!--Fin card con información de la empresa -->
</template>
<script>
import { mapActions } from "vuex";
const stringCiiuOptions = [];
const stringTownOptions = [];
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      valid: true,
      tab: "company",
      info: null,
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
    /* Guardar imagen */
    factoryFn(file) {
      this.info.logo = file[0];
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    editCompany() {
      const data = new FormData();
      data.append("logo", this.info.logo);
      data.append("nit", this.info.nit);
      data.append("name", this.info.name);
      data.append("codeCiiu", this.info.ciiu.id);
      data.append("id_company", this.info.id_company);
      this.StorePost({
        context: "update_company",
        data: data,
      }).then(() => {
        this.$emit("update");
      });
    },
    editAddress() {
      var data = {
        id_address: this.info.id_address,
        addressName: this.info.name_sede,
        address: this.info.address,
        address_description: this.info.address_description,
        town: this.info.town.id,
        phone: this.info.phone,
        contact_person: this.info.contact_person,
      };
      this.StorePost({
        context: "update_address",
        data: data,
      }).then(() => {
        this.$emit("update");
      });
    },
    editAdmin() {
      var data = {
        id_user: this.info.admin.id_user,
        id_document_type: this.info.admin.document_type.id,
        document: this.info.admin.document,
        email: this.info.admin.email,
        name: this.info.admin.name,
        mobile: this.info.admin.mobile,
      };
      this.StorePost({
        context: "update_user_admin",
        data: data,
      }).then(() => {
        this.$emit("update");
      });
    },
  },
  mounted() {
    /* Consulta api de información de la compañia */
    this.StorePost({
      context: "company_show",
      data: { id_company: this.id },
    }).then((response) => {
      var companyArray = response.data.company[0];
      this.info = companyArray;
      this.info.ciiu = {
        id: companyArray.id_ciiu,
        label: companyArray.ciiu,
        description: companyArray.ciiu_description,
      };
      this.info.town = { id: companyArray.id_town, label: companyArray.town };
      this.info.admin = response.data.admin;
      this.info.admin.document_type = {
        id: response.data.admin.id_document_type,
        label: response.data.admin.type,
      };
    });
    /* Fin consulta api de información de la compañia */

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
