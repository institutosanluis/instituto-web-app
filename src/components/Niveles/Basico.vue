<template>
  <div class="text-center">
    <v-container>
      <p class="title-nivel">BÁSICO</p>

      <ul class="nav">
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
      <span style="font-size: 18pt; margin-top: -50px !important" class="mb-15"
        >Grados</span
      >
      <br />
      <v-row class="mt-3">
        <v-col cols="12" md="4" v-for="(item, i) in basico" :key="i">
          <v-card button class="text-center" elevation="5" style="border-radius: 10px">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img style="object-fit: contain;"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              class="img-basicos"
              height="250"
              :src="item.url"
            >
              <div class="grado-description">

                <p class="nivel">{{ item.titulo }}</p>
                <v-btn color="warning" rounded> PENSUM</v-btn>
              </div>
            </v-img>
            <!--<div class="px-5">
              <br />

              <div class="text-left">
                <p style="font-weight: 700">CURSOS</p>
              </div>
            </div>
                    <br />
            -->
    
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "Basico",

  components: {},

  data: () => ({
    basico: [],
  }),
  methods: {
    getBasicoGrados() {
      api.allGrados().then((re) => {
        var data = re.data;
        this.basico = data.result;

        console.log("R -", this.basico);
      });
    },
  },

  created() {
    this.getBasicoGrados();
  },
};
</script>

<style scoped>
.title-nivel {
  font-size: 6vh;
  font-weight: bolder;
}

.grado {
  font-size: 12vh;
  font-weight: bolder;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.abreviatura {
  font-size: 6vh;
  margin-left: -15px;
}

.nivel {
  margin-top: -10px;
  font-size: 20pt;
}

.img-basicos {
  position: relative;
}

.img-basicos .grado-description {
  text-align: center;
  position: absolute;
  font-weight: bolder;
  top: 55%;
  left: 50%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  transform: translate(-50%, -50%);
  font-size: 12vh;
  color: white;
  line-height: 30px;
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
</style>
