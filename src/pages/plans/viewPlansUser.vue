<template>
  <q-page>
    <section class="q-pa-md">
      <div class="row q-col-gutter-sm q-px-sm">
        <div
          class="col-lg-3 col-md-3 col-xs-12 col-sm-12"
          v-for="pricing_item in pricing_data"
          :key="pricing_item.id"
        >
          <cardpricing
            :title="pricing_item.title"
            :icon="pricing_item.icon"
            :price="pricing_item.price"
            :background_image="pricing_item.background_image"
            :text="pricing_item.text"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>
<script>
import cardpricing from "src/components/plans/card-pricing.vue";

const pricing_data = [
  {
    id: 1,
    title: "Basic",
    price: "$0",
    icon: "home_work",
    background_image: "linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)",
    text: [
      { item_id: 1, item: "Hasta 10 usuarios." },
      { item_id: 2, item: "Hasta 2 proyectos." },
      { item_id: 3, item: "80 GB  de almacenamiento." },
      { item_id: 4, item: "Modulo PMA." },
      { item_id: 5, item: "Modulo seguimiento monitoreo." },
      { item_id: 6, item: "Modulo actos administrativos." },
    ],
  },
  {
    id: 2,
    title: "Full",
    price: "$1000",
    icon: "home_work",
    background_image: "linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)",
    text: [
      { item_id: 1, item: "Usuarios ilimitado." },
      { item_id: 2, item: "Hasta 5 proyectos." },
      { item_id: 3, item: "240 GB  de almacenamiento." },
      { item_id: 4, item: "Modulo PMA." },
      { item_id: 5, item: "Modulo seguimiento monitoreo." },
      { item_id: 6, item: "Modulo actos administrativos." },
      { item_id: 7, item: "Modulo matriz de requisitos legales." },
    ],
  },
];
export default {
  components: { cardpricing },
  data() {
    return {
      pricing_data,
    };
  },
};
</script>