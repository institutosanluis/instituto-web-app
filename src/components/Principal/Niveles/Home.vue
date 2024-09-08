<template>
  <div>
    <p class="title-niveles">NIVELES EDUCATIVOS</p>
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
      <v-row class="fill-height" align="center" justify="center">
        <v-col v-for="item in niveles" :key="item.id" cols="12">
          <div v-if="item.titulo.trim() == 'Básico'" class="nivel-basico py-3">
            <v-row>
              <v-col cols="12" md="6" class="text-center">
                <div class="centered-div">
                  <div>
                    <span class="nivel">
                      <p class="nive-title">Nivel</p>
                      <p style=" line-height: 1.2;">{{ item.titulo }}</p></span
                    >

                    <v-btn
                      class="font-weight-black"
                      outlined
                      style="margin-top: -25%"
                      color="white"
                      large
                      >Ver Más</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6" style="padding-top: 0px; padding-bottom: 0px">
                <v-img
                  :class="
                    width > 600
                      ? 'white--text align-end fade-image'
                      : ' white--text align-end fade-image '
                  "
                  :src="item.url"
                >
                </v-img>
              </v-col>
            </v-row>
          </div>
          <div v-else class="nivel-diver">
            <v-row>
              <v-col
                :order="width > 600 ? 'first' : 'last'"
                cols="12"
                md="6"
                style="padding-top: 0px; padding-bottom: 0px"
              >
                <v-img
                  :class="width < 960 ? 'white--text align-end' : 'white--text align-end'"
                  :src="item.url"
                >
                </v-img>
              </v-col>
              <v-col cols="12" md="6" class="text-center">
                <div class="centered-div">
                  <div>
                    <span class="nivel">
                      <p class="nive-title">Nivel</p>
                      <p style="padding: 0px;  line-height: 1.2;">{{ item.titulo }}</p></span
                    >
                    <v-btn
                      class="font-weight-black"
                      outlined
                      style="margin-top: -25%"
                      color="white"
                      large
                      @click="navegarNivel(item.titulo.trim())"
                      >Ver Más</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
    <br />
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "HomeN",

  components: {},
  data: () => ({
    width: window.innerWidth,
    niveles: [
      /*{ id: 1, title: 'Básico', img: '../../../assets/img/basico.jpg' },
    { id: 2, title: 'Diversificado', img: '../../../assets/img/diver.jpg' }*/
    ],
  }),
  beforeDestroy() {
    window.removeEventListener("resize", this.updateWidth);
  },

  methods: {
    navegarNivel(item) {
      console.log(" viene ", item);
      if (item == "Diversificado") {
        this.$router.push({ path: `/nivel=${item}/carreras` });
      }
    },

    getNiveles() {
      api.getAllNiveles().then((re) => {
        var data = re.data;
        var arr = data;
        this.niveles = data.result;
        this.niveles.sort(function (a, b) {
          return a.id - b.id;
        });

        //  arr.forEach( function( val ) { tmp[val.id] = val; } );
      });
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
    this.getNiveles();
  },
};
</script>

<style scoped>
.radius-border-rigth-2 {
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
}

.radius-border-left-2 {
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
}
.nivel-diver {
  /* background: #ffbb00;*/
}

.nivel-basico {
  /* background: rgb(238, 234, 13);*/
}
.nivel {
  font-size: calc(3em + 1vw);
  color: white;
  font-weight: bolder;
}

.nive-title {
  font-size: 20pt;
  margin-bottom: 0pt;
  line-height: 1.2;
}

.title-niveles {
  font-size: 22pt;
  font-weight: bolder;
  color: white;
}

.v-card {
  /*transition: opacity .4s ease-in-out;*/
}

.v-card:not(.on-hover) {
  /*opacity: 0.6;*/
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.portada-principal {
  position: relative;
}

.portada-principal .educacion {
  text-align: center;
  position: absolute;
  font-weight: bolder;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  line-height: 30px;
}

.title-education {
  font-size: 5vh !important;
}

.btn-detalles {
  border-radius: 10px;
  background: orange !important;
  color: white;
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

.centered-div {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100%; /* Altura del div */
}

@media screen and (min-width: 960px) {
  .radius-border-rigth {
    border-top-left-radius: 70px !important;
    border-bottom-left-radius: 70px !important;
  }

  .radius-border-left {
    border-top-right-radius: 70px !important;
    border-bottom-right-radius: 70px !important;
  }
}
@media screen and (min-width: 550px) {
  .title-niveles {
  
    font-weight: bolder;
    font-size: calc(3em + 0.5vw);
  }

  .nivel {
    font-size: calc(3em + 1vw);
    color: white;
    font-weight: bolder;
  }

  .nive-title {
    margin-bottom: 0px;
    line-height: 1.2;
    font-size: 20pt !important;
  }
}

.base-nivel {
  font-weight: bolder;
  text-align: center;
  font-size: 1.8em;
}
</style>
