<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background:white;color:black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen= !leftDrawerOpen"
        />
        <q-toolbar-title>
          <img
          alt="Logo Aquaviva"
          src="~assets/logo-2.jpg"
          style="width: 100px; "
        >
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

 <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-white"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
    >
     <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
      <div style="height: calc(100% - 117px); padding: 10px" >
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <q-toolbar-title class="text-center"
            >
            <div class="text-subtitle1">BIENVENIDO(A)</div>
            <!-- <div class="text-subtitle2">{{ this.name }}</div>
            <div class="text-caption">{{ this.document }}</div> -->
            <br
          />
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


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default{
  name: 'MainLayout',

  components: {
    EssentialLink
  },

}
</script>
<style >
.q-drawer {
    background-size: cover !important;
}
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}
.drawer_dark {
  background-color: #010101f2;
}
</style>
