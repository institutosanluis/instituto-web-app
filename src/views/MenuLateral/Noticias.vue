<template>
  <div>
   <!-- <div class="portada-principal">
                <Portada v-model="typePortada"></Portada>
            </div> -->
    <v-container>
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="text-center">
          <v-card elevation="4" class="px-3 py-5">
            <h4>CALENDARIO DE ACTIVIDADES</h4>
            <p style="text-align: justify">
              Para conocer nuestras próximas actividades, selecciona Nivel y la fecha
            </p>

            <v-radio-group row v-model="nivel" @change="getAgendaNivel($event)">
              <v-radio label="Básico" value="1"></v-radio>
              <v-radio label="Diversificado" value="2"></v-radio>
            </v-radio-group>

            <v-date-picker
              :events="functionEvents"
              @change="getAgendaFecha($event)"
              v-model="fecha"
              :show-current="false"
            ></v-date-picker>
          </v-card>

          <v-card elevation="4" class="mt-2">
            <v-toolbar color="indigo" dark>
              <v-toolbar-title
                >Actividades {{ nivel == 1 ? "Básico" : "Diversificado" }} 
              </v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Titulo</th>
                    <th class="text-left">Horario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-left" v-for="(item, i) in listado" :key="i">
                    <td>{{ item.titulo }}</td>
                    <td>{{ item.hora_ini }} - {{ item.hora_fin }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="6"  >
          <noticias></noticias>
        </v-col>
        <v-col cols="12" md="2"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import noticias from "@/components/Noticias/Principal.vue";
import api from "@/models/controller";
import Portada from "@/components/Principal/Portada.vue";

export default {
  name: "Principal",
  components: { Portada, noticias },
  data: () => ({
    typePortada: "eventos",
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    portada: {},
    isPhoto: false,
    dataFoto: "",
    fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    nivel: "1",
    listado: [],
    listNivel: [],
    mes: null,
    data: null,
    error: null,
  }),

  methods: {
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
    },

    getPortada(type) {
      try {
        api.getPortada(type).then((re) => {
          var portada = re.data;
          this.portada = portada;
        });
      } catch (error) {
        alert(error);
      }
    },

    getEventosActividades() {
      api.getAllEventosActividades().then((re) => {
        this.eventos = [];

        console.log(re);
        var data = re.data;
        for (let i in data) {
          this.eventos.push(data[i]);
        }

        this.eventos = this.eventos.reverse();
      });
    },
    getAgendaNivel(e) {
      var data = {
        fecha: this.fecha,
        nivel: e,
      };

      const [, month] = this.fecha.split("-");

      this.mes = month;

      this.getAgendaActividades(data);
      this.getAgendaActividadesNivel(data);
    },
    getAgendaFecha(e) {
      var data = {
        fecha: e,
        nivel: this.nivel,
      };
      this.getAgendaActividades(data);
    },
    getAgendaActividades(data) {
      api
        .getAgendFecha(data)
        .then((re) => {
          if (re.statusText == "OK") {
            const data = re.data;
            this.listado = data.result;
          }
        })
        .catch((error) => {
          if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            this.error = `Error: ${error.response.status} - ${error.response.data}`;
          } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            this.error = "No se recibió respuesta del servidor.";
          } else {
            // Algo sucedió al configurar la solicitud
            this.error = `Error en la configuración de la solicitud: ${error.message}`;
          }
          this.data = null; // Asegurar que los datos no se muestren en caso de error
        });
    },
    getAgendaActividadesNivel(data) {
      api
        .getAgendAllNivel(data.nivel)
        .then((re) => {
          if (re.statusText == "OK") {
            const data = re.data;
            this.listNivel = data.result;
            var dias = [];
            for (let i in this.listNivel) {
              var fecha = {};
              fecha = this.listNivel[i].fecha;
              const [, , day] = fecha.split("-");
              dias.push(parseInt(day));
            }
            this.listNivel = dias;
          }
        })
        .catch((error) => {
          if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            this.error = `Error: ${error.response.status} - ${error.response.data}`;
          } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            this.error = "No se recibió respuesta del servidor.";
          } else {
            // Algo sucedió al configurar la solicitud
            this.error = `Error en la configuración de la solicitud: ${error.message}`;
          }
          this.data = null; // Asegurar que los datos no se muestren en caso de error
        });
    },
    functionEvents(date) {
      const [, month] = date.split("-");
      if (month == this.mes) {
        const [, , day] = date.split("-");
        if (this.listNivel.includes(parseInt(day, 10))) return true;
        if ([this.listNivel].includes(parseInt(day, 10))) return ["red", "#00f"];
        return false;
      }
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
    this.getPortada(this.value);
    var data = {
      fecha: this.fecha,
      nivel: this.nivel,
    };

    const [, month] = this.fecha.split("-");

    this.mes = month;
    this.getAgendaActividades(data);
    this.getAgendaActividadesNivel(data);
  },

  created() {
    this.maxHeight = screen.height;
 //   this.getPortada(this.value);
    var data = {
      fecha: this.fecha,
      nivel: this.nivel,
    };

    const [, month] = this.fecha.split("-");

    this.mes = month;
    this.getAgendaActividadesNivel(data);
    this.getAgendaActividades(data);
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
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
  font-size: 4vh;
  color: white;
  line-height: 30px;
}

.cajon-descripcion {
  padding-top: 12px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
  margin-bottom: -5px;
  font-weight: bolder;
}

.cajon-ver-mas {
  padding-top: 60px;
  padding-left: 50px;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.5);
}

.cajon-ver-mas-eventos {
  padding-top: 120px;
  background: rgba(10, 10, 10, 0.5);
  width: 100%;
  height: 100%;
}

.btn-ver-mas {
  margin: 0px auto;
  font-size: 13pt;
  color: white;
  font-weight: bolder;
}

.btn-ver-mas-eventos {
  margin: 0px auto;
  font-size: 13pt;
  color: white;
  font-weight: bolder;
}

.contenedor-eventos {
}

.contenido {
  margin-top: -10px;
}

@media screen and (min-width: 550px) {
  .card-eventos {
    width: 200px;
  }

  .contenedor-eventos {
    /* padding-left: 30%;
        padding-right: 30%;*/
  }

  .educacion {
    font-size: 10vh !important;
    line-height: 65px !important;
  }

  .cajon-ver-mas {
    padding-top: 100px;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 10, 0.5);
  }
}

.scrollable-col {
  height: calc(100vh - 64px); /* Resta la altura de la barra de navegación */
  overflow-y: auto; /* Habilita el scroll vertical */
  scrollbar-width: none; /* Oculta la barra de scroll en Firefox */
}

.scrollable-col::-webkit-scrollbar {
  display: none; /* Oculta la barra de scroll en Chrome, Safari y Opera */
}
</style>
