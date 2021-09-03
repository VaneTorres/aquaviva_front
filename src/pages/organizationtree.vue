<template>
  <div id="app">
    <TreeChart
      :json="data"
      :class="{ landscape: landscape.length }"
      @click-node="clickNode"
    />
  </div>
</template>

<script>
import TreeChart from "src/components/Estructure/TreeChart";
export default {
  name: "app",
  components: {
    TreeChart,
  },
  data() {
    return {
      landscape: [],
      data: {
        occupation: "Ceo",
        name: "Victor Robles",
        class: ["rootNode"],
        children: [
          {
            occupation: "Gerente ambiental",
            name: "Rafel Matinez",
          },
          {
            occupation: "Gerente planta",
            name: "Jose Gonzalez",
          },
        ],
      },
    };
  },
  methods: {
    clickNode: function (node) {
      // eslint-disable-next-line
      console.log(node);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .avat {
  border-radius: 2em;
  border-width: 2px;
}
#app .occupation {
  font-weight: 700;
  color:#69bd43 ;
}
#app .name {
  font-weight: 200;
}
.foot {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #333;
  padding: 24px;
  overflow: hidden;
  color: #999;
  font-size: 14px;
  text-align: center;
}
.foot a {
  color: #fff;
  margin: 0 0.5em;
}
</style>