<template>
  <div style="background: white">
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" :md="item.maxcol" v-for="(item, i) in nosotros" :key="i">
              <div class="px-5"
                v-if="item.titulo.trim() == 'Visión' || item.titulo.trim() == 'Misión'"
              >
                <p class="title text-center mb-5">
                  {{ item.titulo }}
                </p>
                <div  v-if="item.titulo.trim() == 'Visión'" class="imagen-id-derecha">
                  <img :src="item.url" />
                </div>
                <p>{{ item.descripcion }}</p>
                <div class="imagen-id" v-if="item.titulo.trim() == 'Misión'">
          <img :src="item.url" />
        </div>
              </div>
              <div v-else class="px-5">
                <p
                  class="quienes-somos mb-8 text-center"
                  style="margin-bottom: 3px; padding-bottom: 0px"
                >
                  {{ item.titulo }}
                </p>
                <p style="text-align: center; font-size: 14pt; font-style: oblique">
                  {{ item.descripcion }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="nosotros.length>0" cols="12" md="4" class="pt-15 pb-15">
          <br />
          <v-img style="border-radius: 10px" :src="nosotros[0].url"></v-img>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "Listado",
  data: () => ({
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    vision: {},
    mision: {},
    nosotros: [],
  }),
  components: {},

  methods: {
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
    },

    getVMEstablecimiento() {
      api.allNoso().then((re) => {
        var data = re.data;
        var result = data.result;
        this.nosotros = result;

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
    this.getVMEstablecimiento();
  },
};
</script>

<style scoped>
.contenido-informacion {
  border-radius: 10px;
  text-align: center;
  color: white;
  font-weight: bolder;
}

div.noticia {
  margin: 20px auto;
  color: #1f1f1f;
}

div.noticia img.izquierda {
  float: left;
  margin-right: 15px;
  height: 70%;
}

div.noticia img.derecha {
  float: right;
  margin-left: 15px;
}

div.reset {
  clear: both;
}

.title {
  font-size: 18pt;
  font-weight: bolder;
  margin-bottom: -3px;
}

.quienes-somos {
  padding-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
  transition-duration: 3s;
  line-height: 35px;
  font-size: 3.5vh;
  font-weight: bolder;
}

/*
border-radius: 39px 162px 39px 162px;
-moz-border-radius: 39px 162px 39px 162px;
-webkit-border-radius: 39px 162px 39px 162px;
border: 0px dashed #000000;
*/

.imagen-id-derecha {
  margin: 0px auto;
  border-radius: 39px 162px 39px 162px;
  -moz-border-radius: 39px 162px 39px 162px;
  -webkit-border-radius: 39px 162px 39px 162px;

  animation-duration: 4s;
  width: 100%;
  height: 250px;
}

.imagen-id-derecha img {
  width: 100%;
  height: 100%;
  border-radius: 39px 162px 39px 162px;
  -moz-border-radius: 39px 162px 39px 162px;
  -webkit-border-radius: 39px 162px 39px 162px;
  object-fit: cover;
}

@keyframes imgderecha {
  0% {
    transform: translatex(200%);
  }

  10% {
    transform: translateX(100%);
  }
}

.imagen-id {
  margin: 0px auto;
  border-radius: 200px 34px 172px 32px;
  -moz-border-radius: 200px 34px 172px 32px;
  -webkit-border-radius: 200px 34px 172px 32px;
  animation-name: imgizquierda;
  animation-duration: 4s;
  object-fit: cover;
  width: 100%;
  height: 250px;
}

.imagen-id img {
  width: 100%;
  height: 100%;
  border-radius: 200px 34px 172px 32px;
  -moz-border-radius: 200px 34px 172px 32px;
  -webkit-border-radius: 200px 34px 172px 32px;
  object-fit: cover;
}

@keyframes imgizquierda {
  0% {
    transform: translatex(-200%);
  }

  10% {
    transform: translateX(-100%);
  }
}

@media screen and (min-width: 550px) {
  .imagen-id-derecha {
    margin: 0px auto;
    border-radius: 39px 162px 39px 162px;
    -moz-border-radius: 39px 162px 39px 162px;
    -webkit-border-radius: 39px 162px 39px 162px;
    width: 70%;
    animation-name: imgderecha;
    height: 250px;
  }

  .imagen-id-derecha img {
    width: 100%;
    height: 100%;
    border-radius: 39px 162px 39px 162px;
    -moz-border-radius: 39px 162px 39px 162px;
    -webkit-border-radius: 39px 162px 39px 162px;
    object-fit: cover;
  }

  .imagen-id img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 200px 34px 172px 32px;
    -moz-border-radius: 200px 34px 172px 32px;
    -webkit-border-radius: 200px 34px 172px 32px;
  }

  .imagen-id {
    margin: 0px auto;
    border-radius: 200px 34px 172px 32px;
    -moz-border-radius: 200px 34px 172px 32px;
    -webkit-border-radius: 200px 34px 172px 32px;
    width: 70%;
    height: 250px;
  }

  .quienes-somos {
    padding-top: 20px;
    padding-left: 80px;
    padding-right: 80px;

    line-height: 50px;
    font-size: 7vh;
    font-weight: bolder;
  }
}
</style>
