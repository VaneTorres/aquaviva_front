<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: white; color: black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          <img
            alt="Logo Aquaviva"
            src="~assets/logo-2.jpg"
            style="width: 100px"
          />
        </q-toolbar-title>
        <!-- Menu de la derecha -->
        <q-btn round dense flat icon="person">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable tag="a" href="/admin/profile">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Perfil</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable tag="a" @click="logout">
                <q-item-section avatar>
                  <q-icon name="mdi-exit-run" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Cerrar sesión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- Fin Menu de la derecha -->
      </q-toolbar>
    </q-header>
    <!-- Menu de la derecha -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-white"
      style="
        background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;
        background-size: cover;
        background-position: right;
      "
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px); padding: 10px">
          <q-toolbar>
            <q-toolbar-title class="text-center">
              <div class="text-subtitle1">BIENVENIDO(A)</div>
              <div class="text-subtitle2">
                {{ $q.localStorage.getItem("NAME_USER") }}
              </div>
            </q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height: 100%">
            <q-list>
              <EssentialLink />
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <!-- FinMenu de la derecha -->
    <!-- Contanido -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- Fin de contenido -->
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapActions } from "vuex";
export default {
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    ...mapActions({
      Storelogout: "parameters/logout",
    }),
    logout() {
      this.Storelogout();
    },
  },
};
</script>

<style>
.q-drawer {
  background-size: cover !important;
}
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.56);
}
.drawer_dark {
  background-color: #010101f2;
}
</style>
