<template>
  <q-card>
    <q-card-section>
      <div class="text-h3 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h4 text-weight-bolder text-center">
        {{ price }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-center">
        <q-list>
          <q-item v-for="item in text" :key="item.item_id">
            <q-item-section avatar>
              <q-icon color="primary" name="check" /> </q-item-section
            ><q-item-label class="text-body2">{{item.item}}</q-item-label>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn outline class="text-capitalize">COMPRAR</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardPricing",
  props: {title:String,price:String, text:Array},
});
</script>

<style scoped>
.q-card {
  padding: 5px;
  border-top: 5px solid #69bd43;
  margin: 20px;
  text-align: center;
  background-image: url("../../../public/3-04.png");
  background-repeat: no-repeat;
  background-position: bottom right;
  max-width: 430px;
}
</style>