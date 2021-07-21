<template>
    <q-page>
      <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >

      <template v-slot:top>
        <q-btn :disable="loading"  round color="primary" icon="add" @click="fixed = true" />
        <q-space />
        <q-input outlined  dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
       <q-dialog v-model="fixed">
         <NewCompany />
    </q-dialog>
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import NewCompany from 'components/NewBusiness.vue'

const columns = [
  {
    name: 'nit',
    required: true,
    label: 'NIT',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name_company', align: 'center', label: 'RAZÓN SOCIAL ', field: 'name_company', sortable: true },
  { name: 'phone', align: 'center', label: 'TELÉFONO', field: 'phone' },
  { name: 'code_ciiu', align: 'center', label: 'CÓDIGO CIIU ', field: 'code_ciiu', sortable: true },
  { name: 'decription_ciiu', align: 'center', label: 'DESCRIPCION CIIU', field: 'decription_ciiu', sortable: true },
 
]

const originalRows = [
  {
    name: "830129674 - 0",
    name_company: "AQUAVIVA GESTION E INGENIERIA S.A.S.",
    code_ciiu: "0130",
    decription_ciiu:"Propagación de plantas (actividades de los viveros, excepto viveros forestales)",
    phone:"3212829956"
  },
  
  {
     name: "830129674 - 0",
    name_company: "AQUAVIVA GESTION E INGENIERIA S.A.S.",
    code_ciiu: "0132",
    logo:"",
    decription_ciiu:"Propagación de plantas (actividades de los viveros, excepto viveros forestales)",
    phone:"3212829956"
  },

]

export default {
  components: {
    NewCompany
  },
  setup () {
    
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)
    const rows = ref([...originalRows])

    return {
      fixed: ref(false),
      columns,
      rows,
      loading,
      filter,
      rowCount,

      // emulate fetching data from server
      addRow () {
        loading.value = true
        setTimeout(() => {
          const
            index = Math.floor(Math.random() * (rows.value.length + 1)),
            row = originalRows[ Math.floor(Math.random() * originalRows.length) ]

          if (rows.value.length === 0) {
            rowCount.value = 0
          }

          row.id = ++rowCount.value
          const newRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
          rows.value = [ ...rows.value.slice(0, index), newRow, ...rows.value.slice(index) ]
          loading.value = false
        }, 500)
      },
    }
  }
}
</script>

