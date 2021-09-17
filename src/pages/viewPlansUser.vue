<template>
    <q-page>
        <section class="q-pa-md">
        <div class="row q-col-gutter-sm q-px-sm">
            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12" v-for="pricing_item in pricing_data" :key="pricing_item.id">
            <cardpricing :title="pricing_item.title" :icon="pricing_item.icon" :price="pricing_item.price"
                          :background_image="pricing_item.background_image" :text="pricing_item.text"/>
          </div>
        </div>
      </section>
    </q-page>
</template>
<script>
import cardpricing from "src/components/plans/card-pricing.vue";

const pricing_data = [
  {
    id:1,
    title: 'Basic',
    price: '$0',
    icon: 'home_work',
    background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
    text: [{item_id:1,item:'This is good if your company size is between 2 and 10 Persons.'},{item_id:2,item:'This is good if your company size is between 2 and 10 Persons.'}]
  },{
      id:2,
    title: 'Full',
    price: '$1000',
    icon: 'home_work',
    background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
    text: [{item_id:1,item:'This is good if your company size is between 2 and 10 Persons.'}]
  }]
  export default {
  components: { cardpricing },
      data() {
    return {
        pricing_data,
    }}
  }
</script>