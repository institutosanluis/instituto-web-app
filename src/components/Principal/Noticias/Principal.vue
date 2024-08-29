<template>
  <div class="noticias py-5 text-center">
    <h1 class="text-white font-weight-black size-text" style="color: white">NOTICIAS</h1>
    <br />
<div class="px-5">
      <div class="scroll-container">
        <div class="scroll-content">
          <div v-for="(item, index) in repeatedItems" :key="index" class="scroll-item">
            <v-card style="height: 550px; width: 550px; text-align: left;" >
                
              <img style="object-fit:contain; height: 75%; width: 100%;" :src="item.url"/>
              <span class="px-5 mt-3"> <v-icon>mdi-earth</v-icon> <span style="font-size: 12px;">{{  formatFechaHora(item.fechahora) }} - {{ formatHora(item.fechahora) }}</span> </span>
              <p class="px-5 py-2">{{  item.publicacion }}</p>
            
            </v-card>

      
          </div>
        </div>
      </div>
    </div>
    <br>
    <v-btn elevation="0" color="success" @click="navegar()">Ver más <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
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
    formatFechaHora(item){

        return new Date(item).toLocaleDateString()
    },
    formatHora(item){

return new Date(item).toLocaleTimeString()
},
    getNoticias() {
      try {
        api.allNoticiasTop5().then((re) => {
          var data = re.data;
          this.slides = data.result;
          console.log("RETOS ", re);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    // Repite los elementos dos veces para crear un efecto de repetición continua
    repeatedItems() {
      return [...this.slides, ...this.slides];
    },
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
</style>
