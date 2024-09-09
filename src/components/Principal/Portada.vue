<template>
  <div class="portada-principal">
    <v-carousel
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
      :height="maxWidth < 700 ? '220' : '720'"
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item :src="portada.url" class="cover-image-container">
        <!-- <div v-if="value=='Principal'" class="hoja-papel">
                    <v-img class="img-papel" src="../../assets/img/papel.png">
                        <p class="texto-anuncio"><b>INSCRIPCIÓN GRATIS</b> <br> Primer Ingreso</p>
                  
                    </v-img>
                </div>-->
        <span v-if="value!='admisiones'" class="educacion" :style="{ padding: this.portada.padding, backgroundColor: this.portada.backgroundcolor,  color: this.portada.color }">{{portada.titulo}}</span>

        <!--<div
          class="dynamic-text"
          :style="{
            top: this.portada.top,
            left: this.portada.left_,
            fontSize: this.portada.fontsize,
            color: this.portada.color,
            backgroundColor: this.portada.backgroundcolor,
            position: this.portada.position,
            padding: this.portada.padding,
            borderRadius: this.portada.borderradius,
          }"
        >
          {{ portada.titulo }}
        </div> -->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "Home",
  props: ["value"],
  data: () => ({
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    portada: {},
  }),

  computed: {
    /*  dynamicStyles() {
      return {
        top: this.portada.top,
        left: this.portada.left,
        fontSize: this.portada.fontSize_,
        color: this.portada.color,
        backgroundColor:this.portada.backgroundColor,
        position:this.portada.position,
        padding: this.portada.padding,
        borderRadius: this.portada.borderRadius,
      };
    },*/
  },

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
        this.portada = portada.result;
      });
    },
    dynamicStyles() {
      return {
        top: this.portada.top,
        left: this.portada.left,
        fontSize: this.portada.fontSize_,
        color: this.portada.color,
        backgroundColor: this.portada.backgroundColor,
        position: this.portada.position,
        padding: this.portada.padding,
        borderRadius: this.portada.borderRadius,
      };
    },
  },

  watch: {
    data() {
      this.maxWidth = screen.width;
      console.log(this.maxWidth);
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
    this.getPortada(this.value);
  },
};
</script>

<style>
.educacion {
  animation-name: portada;
  animation-duration: 4s;
  /*text-shadow: rgb(0, 0, 0) 2px 5px;*/
  text-shadow: 1px 1px 2px black, 0 0 1em rgb(27, 27, 27), 0 0 0.2em rgb(36, 36, 36);
}

@keyframes portada {
  0% {
    left: 0px;
    top: 0px;
  }
  35% {
    left: 170px;
    top: 200px;
  }
}

.hoja-papel {
  position: absolute;
  top: 0px;
  left: 15px;
  width: 150px;
  height: 150px;
  animation-name: portada-papel;
  animation-duration: 4s;
}

@keyframes portada-papel {
  0% {
    left: 0px;
    top: 0px;
  }
  35% {
    left: 30px;
    top: 2px;
  }
}

.img-papel {
  width: 100%;
  height: 100%;
}

.texto-anuncio {
  margin-top: 32px;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  -webkit-transform: rotate(-6.5deg);
  -moz-transform: rotate(-6.5deg);
  -o-transform: rotate(-6.5deg);
  transform: rotate(-6.5deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}

@media screen and (max-width: 600px) {
}
@media screen and (min-width: 550px) {
  .texto-anuncio {
    margin-top: 80px;
    padding: 10px;
    text-align: center;
    font-size: 15px;
    -webkit-transform: rotate(-6.5deg);
    -moz-transform: rotate(-6.5deg);
    -o-transform: rotate(-6.5deg);
    transform: rotate(-6.5deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  }
  .hoja-papel {
    position: absolute;
    top: 5px;
    left: 15px;
    width: 230px;
    height: 230px;
    animation-name: portada-papel;
    animation-duration: 4s;
  }

  .img-papel {
    width: 100%;
    height: 100%;
  }

  @keyframes portada {
    0% {
      left: 0px;
      top: 0px;
    }
    35% {
      left: 600px;
      top: 350px;
    }
  }

  @keyframes portada-papel {
    0% {
      left: 0px;
      top: 0px;
    }
    35% {
      left: 60px;
      top: 4px;
    }
  }

  .educacion {
    font-size: 10vh !important;
    line-height: 65px !important;
  }
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

.cover-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.dynamic-text {
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  white-space: nowrap;
}
</style>
