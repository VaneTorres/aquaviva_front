<template>
  <q-item
    clickable
    tag="a"
    href="/admin/dashboard"
  >
    <q-item-section
      avatar
    >
    <q-icon name="dashboard"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Dashboard</q-item-label>
    </q-item-section>
  </q-item>
  <q-item
    clickable
    tag="a"
    to="/admin/business"
  >
    <q-item-section
      avatar
    >
    <q-icon name="business"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Registro de empresa</q-item-label>
    </q-item-section>
  </q-item>
  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
})
</script>
