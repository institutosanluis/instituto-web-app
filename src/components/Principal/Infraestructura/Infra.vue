<template>
  <div>
    <br />
    <br />
    <p class="title-equipo">CONTAMOS CON</p>
    <ul class="nav mb-10">
      <li>
        <div id="circle"></div>
      </li>
      <li>
        <div id="circle"></div>
      </li>
      <li>
        <div id="circle"></div>
      </li>
    </ul>

    <div>
      <v-row class="mb-6" justify="center" >
      <v-col cols="6" md="3" v-for="(item, i) in contamos" :key="i" class="text-center">
    <v-avatar :size="maxWidth >600 ? 250 : 150">
              <v-img style="width: 100%; height: 100%; object-fit: cover" :src="item.url">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <h4>{{ item.titulo }}</h4>
      </v-col>
       </v-row>
    </div>
    <br>
  </div>
</template>
<script>
import api from "@/models/controller";

export default {
  name: "Carreras",

  components: {},

  data: () => ({
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    contamos: [],
  }),
  methods: {
    getContamosCon() {
        this.contamos = [];
        api.allInfraestructura().then((re)=>{
            var data = re.data;
            this.contamos = data.result;
        })

     /* api.getContamosCon().then((re) => {
        for (let i in re.data) {
          this.contamos.push(re.data[i]);
        }

      });*/
    },
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
    },
  },
  watch: {
    data() {
      this.maxWidth = screen.width;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);

      window.addEventListener("scroll", this.onResize1);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.maxHeight = screen.height;
    this.getContamosCon();
  },
};
</script>

<style scoped>
.title-equipo {
  font-size: 24pt;
  font-weight: bolder;
}

.nav {
  margin-top: -10px !important;

  list-style-type: none;
  text-align: center;
  margin: 0;
  padding: 0;
}

.nav li {
  display: inline-block;
  font-size: 20px;
  padding: 0px;
}

.circle-contamos {
  background: #ffbb00;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-left: 5px;
  margin-right: 6px;
  display: flex;
  /*Convertimos al menú en flexbox*/
  justify-content: space-between;
  /*Con esto le indicamos que margine todos los items que se encuentra adentro hacia la derecha e izquierda*/
  align-items: center;
}

#circle {
  background: #ffbb00;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 6px;
  display: flex;
  /*Convertimos al menú en flexbox*/
  justify-content: space-between;
  /*Con esto le indicamos que margine todos los items que se encuentra adentro hacia la derecha e izquierda*/
  align-items: center;
  /*con esto alineamos de manera vertical*/
}

@media screen and (min-width: 550px) {
  .title-equipo {
    font-size: 6vh;
    font-weight: bolder
  }
}
</style>
