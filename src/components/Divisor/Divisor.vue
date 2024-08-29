<template>
  <div class="detalle-jornadas py-8">
    <h1 class="text-md-h2 text-sm-h1 text-center font-weight-black">{{ titulo }}</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-container class="text-center">
            <v-row>
              <v-col cols="12" md="6" v-for="(item, i) in nivelesall" :key="i">
                <v-card flat class="py-5" elevation="0">
                  <h1 style="color: black" class="font-weight-bold text-md-h3 text-sm-h4 text-center">
                    {{ item.titulo }}
                  </h1>

                  <v-container>
                  <v-row v-for="(req, i) in getRequisitos(item.idnivel)" :key="i">
                  <v-col cols="8" class="text-left font-weight-regular">
             {{ req.mensaje }}
                  </v-col>
                  <v-col cols="4" class="d-flex align-center text-left">
                   Q.{{ req.precio }}
                </v-col>
                  </v-row>
                  </v-container>

  
                </v-card>

                <!--<div style="background: white; " class="rounded-lg px-3">
                 <div>
                    <ul style="text-align: justify; color: black" >
                      <li
                        style="list-style: none"
                        v-for="(req, i) in getRequisitos(item.idnivel)"
                        :key="i"
                      >
                        <v-icon>mdi-check</v-icon> {{ req.mensaje }}  <p style="font-size: 14pt;">Q.{{req.precio  }}</p>
                      </li>
                    </ul>
                  </div>
                  <br />
                </div>-->
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import api from "@/models/controller";
export default {
  name: "Divisor",
  props: ["titulo", "subtitulo"],
  data: () => ({
    nivelesall: [],
    mensualidades: [],
  }),
  methods: {
    getRequisitos(item) {
      var mensual = [];

      for (let i in this.mensualidades) {
        if (this.mensualidades[i].idnivel == item) {
          mensual.push(this.mensualidades[i]);
        }
      }

      return mensual;
    },
    getNivelesall() {
      // this.listaNiveles = [];
      api.getNiveles().then((re) => {
        var data = re.data;
        var result = data.result;
        this.nivelesall = result;
        console.log("nivele ", this.nivelesall);
      });
    },

    getMensualidades() {
      api.getMensualidades().then((re) => {
        var data = re.data;
        var result = data.result;
        this.mensualidades = result;
        console.log("MENSUALIDADES", this.mensualidades);
      });
    },
  },
  created() {
    this.maxHeight = screen.height;
    this.getMensualidades();
    this.getNivelesall();
  },
};
</script>

<style scoped>
.title-jornadas {
  position: relative;
  width: 100%;
  height: 80px;
}

.title-jornadas .contenido-jornada {
  text-align: center;
  position: absolute;
  font-weight: bolder;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7vh;
  color: rgb(33, 6, 97);
  line-height: 30px;
}

.title-jornadas .lista-jornadas {
  text-align: center;
  position: absolute;
  font-weight: bolder;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  line-height: 30px;
}

.detalle-jornadas {
  background: rgb(25, 163, 255);
  color: white;
  font-weight: bolder;
}

@media screen and (max-width: 550px) {
  .title-jornadas .contenido-jornada {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5vh;
    color: rgb(33, 6, 97);
    line-height: 30px;
  }
}

@media screen and (min-width: 550px) {
  .title-proceso {
    text-align: left;
    font-size: 10vh;
    font-weight: bolder;
    color: white;
  }

  .cajon-logo {
    text-align: center;
    width: 350px !important;
    height: 350px !important;
    margin: 0px auto;
  }

  .nivel {
    color: black;
    font-size: 6vh;
  }
}

.title-proceso {
  text-align: center;
  font-size: 4.5vh;
  font-weight: bolder;
  color: white;
}

.detalle-jornadas {
  background: rgb(25, 163, 255);
  border-top: 4px orange solid;
  color: white;
  font-weight: bolder;
}

.nivel {
  color: black;
  font-size: 6vh;
  line-height: 50px;
}
</style>
