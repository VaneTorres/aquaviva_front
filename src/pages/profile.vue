<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg">
          <q-card-section class="text-h6">
            <div class="text-h6">Editar perfil</div>
            <div class="text-subtitle2">Complete su perfil</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="typedocument" label="Tipo de documento" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="document" label="Tipo de documento" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="name" label="Nombre(s) y apellido(s)" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="cel" label="Número de celular" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="email" label="Correo electrónico" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense type="password" v-model="password" label="Contraseña" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense type="password" v-model="password_confirm" label="Confirmar contraseña" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-primary text-white"
              >Editar</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
       <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <q-card class="card-bg">
          <q-card-section class="text-center ">
            <div class="text-h6 ">Departamento</div>
            <div class="text-subtitle2 "> CEO</div>
          </q-card-section>
          <q-card-section class="text-center ">
            <div class="text-h6 ">Cargo</div>
            <div class="text-subtitle2 "> Ingeniero ambiental</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      name:null,
      document:null,
      typedocument:null,
      cel:null,
      email:null,
      password:null,
      password_confirm:null
    };
  },
};
</script>
      