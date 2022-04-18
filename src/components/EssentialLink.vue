<template>
  <q-item clickable tag="a" href="/admin/dashboard">
    <q-item-section avatar>
      <q-icon name="dashboard" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Inicio</q-item-label>
    </q-item-section>
  </q-item>
  <q-item
    clickable
    tag="a"
    to="/admin/company"
    v-if="permissions.includes('Listar empresa')"
  >
    <q-item-section avatar>
      <q-icon name="business" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Empresas</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    class="q-py-sm"
    icon="mdi-cogs"
    label="Parametrizar"
    v-if="
      permissions.includes('Listar programas') ||
      permissions.includes('Listar proyectos por empresa')
    "
  >
    <q-list>
      <q-item
        clickable
        tag="a"
        to="/admin/parameterize/program"
        v-if="permissions.includes('Listar programas')"
      >
        <q-item-section avatar>
          <q-icon name="mdi-content-save-cog-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Programas ambientales</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        tag="a"
        to="/admin/parameterize/project"
        v-if="permissions.includes('Listar proyectos por empresa')"
      >
        <q-item-section avatar>
          <q-icon name="mdi-folder-cog-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Proyectos ambientales</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
  <q-item
    clickable
    tag="a"
    to="/admin/mycompany"
    v-if="permissions.includes('Ver mi empresa')"
  >
    <q-item-section avatar>
      <q-icon name="business" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Mi empresa</q-item-label>
    </q-item-section>
  </q-item>
  <q-item clickable tag="a" to="/admin/plansuser">
    <q-item-section avatar>
      <q-icon name="mdi-ballot-outline" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Planes</q-item-label>
    </q-item-section>
  </q-item>
  <q-item clickable tag="a" to="/admin/plans">
    <q-item-section avatar>
      <q-icon name="mdi-ballot-outline" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Parametrizar planes</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    class="q-py-sm"
    icon="mdi-clipboard-text-search-outline"
    label="Modelo de seguimiento ambiental"
    v-if="permissions.includes('Listar monitoreos')"
  >
    <q-list>
      <q-item
        clickable
        tag="a"
        to="/admin/environmental_monitored"
        v-if="permissions.includes('Listar monitoreos')"
      >
        <q-item-section avatar>
          <q-icon name="mdi-clipboard-text-search-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Proyectos de la organización</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/admin/formatSIG">
        <q-item-section avatar>
          <q-icon name="mdi-file-multiple-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Formatos SIG</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
  <q-expansion-item
    class="q-py-sm"
    icon="mdi-folder-upload-outline"
    label="Obligaciones"
    v-if="permissions.includes('Listar fichas')"
  >
    <q-list>
      <q-item
        clickable
        tag="a"
        to="/admin/load_of_obligations/obligation"
        v-if="permissions.includes('Listar fichas')"
      >
        <q-item-section avatar>
          <q-icon name="mdi-book-arrow-up-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Carga de obligaciones manual</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/admin/load_of_obligations/evidence">
        <q-item-section avatar>
          <q-icon name="mdi-book-arrow-up-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Carga de evidencias</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>

  <q-item clickable tag="a" to="/admin/departments">
    <q-item-section avatar>
      <q-icon name="mdi-file-tree-outline" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Departamentos</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  data() {
    return {
      permissions: [],
    };
  },
  mounted() {
    this.permissions = this.$q.localStorage.getItem("PERMISSIONS");
  },
});
</script>
