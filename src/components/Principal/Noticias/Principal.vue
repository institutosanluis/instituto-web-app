<template>
  <div class="noticias py-5 text-center">
    <h1 class="text-white font-weight-black size-text" style="color: white">NOTICIAS</h1>
    <br />
    <div class="px-5">
      <div class="scroll-container">
        <div class="scroll-content">
          <div v-for="(item, index) in repeatedItems" :key="index" class="scroll-item">
            <v-card style=" width: 550px; text-align: left">
              <v-row no-gutters>
          <v-col cols="12" class="pt-3">
            <div class="px-3">
              <p>
                <v-icon>mdi-earth</v-icon>
                <span style="font-size: 12px">
                  {{ formatFecha(item.fechahora) }} -
                  {{ formatHora(item.fechahora) }}</span
                >
              </p>
              <p class="font-weight-medium">{{ item.publicacion }}</p>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="gallery" :class="'gallery-' + item.galeria.length">
              <v-row no-gutters dense>
                <v-col
                  v-for="(media, index) in item.galeria"
                  :key="index"
                  :cols="getCols(item.galeria.length, index)"
                >
                  <v-img
                    v-if="extractedText(media.tipo) == 'image/'"
                   
                    :src="media.url"
                    class="gallery-item"
                    max-height="300"
                    contain
                  ></v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <br />
    <v-btn elevation="0" color="success" @click="navegar()"
      >Ver más <v-icon>mdi-arrow-right-thin</v-icon></v-btn
    >
  </div>
</template>
<script>
import api from "@/models/controller";
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [],
    };
  },
  methods: {
    navegar() {
      //to="/eventos"
      this.$router.push("/eventos");
    },
    formatFecha(item) {
      return new Date(item).toLocaleDateString();
    },
    formatHora(item) {
      return new Date(item).toLocaleTimeString();
    },
    extractedText(tipo) {
      return tipo.substring(0, 6); // Extrae "Este "
    },
    getNoticias() {
      try {
        api.allNoticiasTop5().then((re) => {
          var data = re.data;
          this.slides = data.result;
        });
      } catch (error) {
        console.error(error);
      }
    },
    getCols(count, index) {
      if (count === 1) return 12;
      if (count === 2) return 6;
      if (count === 3 && index === 0) return 12; // La primera imagen grande
      if (count === 3 && index > 0) return 6; // Las dos siguientes más pequeñas
      if (count === 4) return 6; // Dos filas de dos columnas
      if (count >= 5 && index < 2) return 6; // Tres imágenes por fila
      if (count >= 5 && index >= 2 && index < 5) return 4;
    },
  },
  computed: {
    // Repite los elementos dos veces para crear un efecto de repetición continua
    repeatedItems() {
      return [...this.slides, ...this.slides];
    },
  },
  beforeDestroy (){
    this.getNoticias();
  },
  created() {
    this.getNoticias();
  },
};
</script>

<style scoped>
.noticias {
  text-align: center;
  background: #ffbb00 !important;
}

.size-text {
  font-size: 6vh;
}

.v-carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  width: 100%;
}

.scroll-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.scroll-content {
  display: inline-flex;
  animation: scroll 100s linear infinite;
}

.scroll-item {
  display: inline-block;
  text-align: center;
  margin-right: 15px;
  flex-shrink: 0;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.gallery-item {
  border-radius: 2px;
  overflow: hidden;
}
</style>
