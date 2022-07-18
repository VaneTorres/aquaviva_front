<template>
  <div id="app">
    <TreeChart
      :json="datatree"
      :class="{ landscape: landscape.length }"
      @click-node="clickNode"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TreeChart from "src/components/Estructure/TreeChart";
export default {
  name: "app",
  components: {
    TreeChart,
  },
  data() {
    return {
      landscape: [],
      datatree: {
        id_father: null,
        id_structure: null,
        occupation: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapActions({
      StorePost: "parameters/PostAxios",
    }),
    childrenFine(jsonData, val) {
      if (Array.isArray(jsonData.children)) {
        jsonData.children.forEach((c) => {
          if ((val.id_father == c.id_structure) & (val.id_mate == null)) {
            if (!Array.isArray(c.children)) {
              c.children = [];
            }
            c.children.push({
              id_father: val.id_father,
              id_structure: val.id_structure,
              occupation: val.employment,
              name: val.name,
            });
          }
          if (val.id_mate == c.id_structure) {
            if (!Array.isArray(c.mate)) {
              c.mate = [];
            }
            c.mate.push({
              id_father: val.id_father,
              id_structure: val.id_structure,
              occupation: val.employment,
              name: val.name,
            });
          }
          this.childrenFine(c, val);
        });
      }
      return jsonData;
    },
    insert(value) {
      const newNode = new Tree(value, null);
      if ((value.id_father == null) & (value.id_mate == null)) {
        this.datatree.id_structure = value.id_structure;
        this.datatree.occupation = value.employment;
        (this.datatree.name = value.name), (this.datatree.class = ["rootNode"]);
        this.root = newNode;
      } else {
        let auxiliar = this.root;
        if (value.id_father != null) {
          if (
            (value.id_father == auxiliar.value.id_structure) &
            (value.id_mate == null)
          ) {
            this.datatree.children.push({
              id_father: value.id_father,
              id_structure: value.id_structure,
              occupation: value.employment,
              name: value.name,
            });
          } else {
            this.childrenFine(this.datatree, value);
          }
        }
        if (value.id_mate != null) {
          if (value.id_mate == auxiliar.value.id_structure) {
            if (!Array.isArray(this.datatree.mate)) {
              this.datatree.mate = [];
            }
            this.datatree.mate.push({
              id_father: value.id_father,
              id: value.id_structure,
              occupation: value.employment,
              name: value.name,
            });
          }
        }
      }
    },
  },
  mounted() {
    const data = { id_area: this.$store.getters["parameters/departament"] };
    this.StorePost({ context: "get_structure", data: data }).then(
      (response) => {
        this.datatree.children = [];
        response.data.forEach((element) => {
          this.insert(element);
        });
      }
    );
  },
};
class Tree {
  constructor(value) {
    this.value = value;
    this.control = null;
  }
}
class root {
  constructor() {
    this.root = null;
  }
}
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
  color: #69bd43;
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
