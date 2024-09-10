<template>
  <div>
    <Portada v-model="typePortada"></Portada>
    <div class="detalle-jornadas py-5 px-10"></div>

    <br />

    <v-container>
      <h1 class="my-10 text-center">REQUISITOS</h1>
      <v-row>
        <v-col
          cols="12"
          md="12"
          class="col-nivel"
          v-for="(item, i) in listaNiveles"
          :key="i"
        >

        <v-card class="py-5">
          <h1 style="color: black" class="font-weight-bold text-md-h3 text-sm-h4">
            {{ item.titulo }}
          </h1>

          <!-- <div style="width: 100%">
              <div class="cajon-logo">
                <img style="height: 265px" class="img-logo" :src="item.url" />
              </div>
            </div> -->
   
            <p class="text-requisitos">
              <v-icon size="35">mdi-list-box-outline</v-icon>Requisitos de Inscripción
            </p>
            <br />

            <ul style="text-align: justify; margin-left: 0px; padding-left: 0px;" class="px-5">
              <li
                style="list-style: none; margin-left: 0px; padding-left: 0px;"
                v-for="(req, i) in getRequisitos(item.idnivel)"
                :key="i"
              >
                <v-icon>mdi-check</v-icon> {{ req.requerimiento }}
              </li>
            </ul>
            <br />
            <p class="text-requisitos"><v-icon size="35">mdi-cash</v-icon>MENSUALIDAD</p>

      
              <v-row no-gutters justify="center">
                <v-col
                  style="background: rgb(25, 163, 255); color: white"
                  cols="8"
                  md="8"
                  class="text-center"
                >
                  <p class="font-weight-bold text-md-h5 pt-3"> Grados</p>
                </v-col>
                <v-col
                  style="background: rgb(25, 163, 255); color: white"
                  cols="4"
                  md="4"
                  class="text-center pt-3"
                >
                  <p class="font-weight-bold text-md-h5">Mensual (Q.)</p>
                </v-col>
              </v-row>

             
                <v-row    v-for="(req, i) in getMensualidad(item.idnivel)"
                :key="i">
                  <v-col cols="8" md="8" class="px-5 text-left" >
                    {{ req.mensaje }}
                  </v-col>
                  <v-col cols="4" md="4" class="text-center px-5" justify="center">
                    <p class="text-h5 font-weight-bold">Q.{{ req.precio }}</p>
                  </v-col>
                </v-row>

                <!--    {{ req.mensaje}}   <p class="text-h3 font-weight-bold" > <v-icon size="40">mdi-alpha-q-circle</v-icon>{{ req.precio }}</p>-->
           
          <br />
        </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!--<Divisor :titulo="'MENSUALIDADES'"></Divisor> -->
  </div>
</template>

<script>
import api from "@/models/controller";
import Portada from "@/components/Principal/Portada.vue";
import Divisor from "@/components/Divisor/Divisor.vue";

export default {
  name: "Admisiones",
  components: { Portada, Divisor },
  data: () => ({
    typePortada: "admisiones",
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    portada: {},
    requisitos: null,
    listaNiveles: [],
    nivelesall: [],
    mensualidades: [],
  }),

  methods: {
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
    },

    getPortada(type) {
      api.getPortada(type).then((re) => {
        var portada = re.data;
        this.portada = portada;
      });
    },
    getMensualidad(item) {
      var mensual = [];

      for (let i in this.mensualidades) {
        if (this.mensualidades[i].idnivel == item) {
          mensual.push(this.mensualidades[i]);
        }
      }

      return mensual;
    },
    getRequisitos(item) {
      var requisitos = [];

      for (let i in this.requisitos) {
        if (this.requisitos[i].idnivel == item) {
          requisitos.push(this.requisitos[i]);
        }
      }

      return requisitos;
    },

    getrequisitosAll() {
      api.getRequisitosAll().then((re) => {
        var data = re.data;
        // this.listado = data.result;
        this.requisitos = data.result;
      });
    },
    getAdmisiones() {
      // this.listaNiveles = [];
      api.getNiveles().then((re) => {
        var data = re.data;
        var result = data.result;
        this.nivelesall = result;
        for (let i in result) {
          this.listaNiveles.push(result[i]);
        }
      });
    },

    getMensualidades() {
      api.getMensualidades().then((re) => {
        var data = re.data;
        var result = data.result;
        this.mensualidades = result;
      });
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
    this.getMensualidades();
    this.getrequisitosAll();
    this.getAdmisiones();
  },
};
</script>

<style scoped>
.title-proceso {
  text-align: center;
  font-size: 4.5vh;
  font-weight: bolder;
  color: rgb(33, 6, 97);
}

.detalle-jornadas {
  background: rgb(25, 163, 255);
  border-top: 4px orange solid;
  color: white;
  font-weight: bolder;
}

.nivel {
  font-size: 6vh;
  font-weight: bolder;
  line-height: 50px;
}

@media screen and (min-width: 550px) {
  .title-proceso {
    text-align: left;
    font-size: 8vh;
    font-weight: bolder;
    color: rgb(33, 6, 97);
  }

  .cajon-logo {
    text-align: center;
    width: 350px !important;
    height: 350px !important;
    margin: 0px auto;
  }

  .nivel {
    font-size: 6vh;
    font-weight: bolder;
  }
}

.cajon-logo {
  text-align: center;
  width: 250px !important;
  height: 250px !important;
  margin: 0px auto;
}

.img-logo {
  width: 100% !important;
}

.col-nivel {
  text-align: center !important;
  margin: 0 auto !important;
}

.text-requisitos {
  font-weight: bolder;
  font-size: 18pt;
}

.educacion {
  animation-name: example;
  animation-duration: 3s;
}

@keyframes example {
  0% {
    left: 0px;
    top: 0px;
  }

  35% {
    left: 110px;
    top: 200px;
  }
}

@media screen and (max-width: 600px) {
}

@media screen and (min-width: 550px) {
  .educacion {
    width: 500px;
    top: 40%;
    font-size: 10vh !important;
    line-height: 65px !important;
  }

  @keyframes example {
    0% {
      left: 0px;
      top: 0px;
    }

    35% {
      left: 400px;
      top: 350px;
    }
  }
}

.carousel-item-portada {
}
</style>
