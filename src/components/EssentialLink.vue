<template>
  <q-item clickable tag="a" href="/admin/dashboard">
    <q-item-section avatar>
      <q-icon name="dashboard" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Dashboard</q-item-label>
    </q-item-section>
  </q-item>
    <q-item clickable tag="a" to="/admin/company">
    <q-item-section avatar>
      <q-icon name="business" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Empresas</q-item-label>
    </q-item-section>
  </q-item>
   <q-item clickable tag="a" to="/admin/mycompany">
    <q-item-section avatar>
      <q-icon name="business" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Mi empresa</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
  class="q-py-sm"
    icon="mdi-clipboard-text-search-outline"
    label="Modelo de seguimiento ambiental"
  >
    <q-list>
      <q-item clickable tag="a" to="/admin/environmental_monitored">
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Monitoreo ambiental</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
<q-expansion-item
    class="q-py-sm"
    icon="mdi-clipboard-text-search-outline"
    label="Carge de obligaciones"
  >
    <q-list>
      <q-item clickable tag="a" to="/admin/load_of_obligations/pma">
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Fichas PMA</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/admin/environmental_monitored">
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Fichas de seguimiento y monitoreo</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" >
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Permisos y otras autorizaciones</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" >
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Actos administrativos de seguimiento ambiental</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>

  <q-item clickable tag="a" to="/admin/organizationtree">
    <q-item-section avatar>
      <q-icon name="mdi-account-network" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Estructura de control</q-item-label>
    </q-item-section>
  </q-item>
 
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
});
</script>
