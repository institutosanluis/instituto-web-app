<template>
  <v-card :height="maxHeight > 600 ? 280 : 290"  class="anuncios mb-15 " elevation="5">
    <v-carousel
      cycle
      interval="9000"
      style="height: 100%; object-fit:contain"
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      hide-delimiters

      :show-arrows="false"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i" >
        <v-row no-gutters>
          <v-col cols="12" :md="item.col_text">
            <div class="text-center cajon-anuncio ">
              <p class="font-weight-black titulo-text">{{ item.titulo }}</p>
              <p class="font-weight-medium titulo-descripcion">{{ item.descripcion }}    {{ imageHeight }}</p>
            </div>
          </v-col>
          <v-col cols="12" :md="item.col_img">
            <v-img style="height: 100%; object-fit: contain;"  :src="item.url" class="d-block w-100"> </v-img>
          </v-col>
       
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script>
import api from "@/models/controller";
export default {
  name: "Anuncios",
  data: () => ({
    items: [],
    maxHeight: 0,
    maxWidth: window.innerWidth,
    imageHeight: null
  }),
  methods: {
    getImageHeight() {
      const imgElement = this.$refs.myImage.$el.querySelector('img');
      this.imageHeight = imgElement.naturalHeight || imgElement.height;
    },
    getAllItems() {
      try {
        api.allAnuncios().then((re) => {
          var result = re.data;
          this.items = result.result;
        });
      } catch (error) {}
    },
    onResize() {
      this.maxWidth = window.innerWidth;
    },
  },

  computed: {
    imageStyle() {
      return {
        width: this.maxWidth + 'px'
      };
    }
  },

  mounted() {
      window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  

  created() {
    this.maxWidth = screen.width;
    this.getAllItems();
  },
};
</script>

<style scoped>
.anuncios {
  height: 200px;
  width: 100%;
  background: white;
}

/* Estilos personalizados para el banner */
.fill-height {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.cajon-anuncio{
    padding: 5%;
  }

.titulo-text{
    font-size: 22pt;
  }


  .titulo-descripcion{
    margin: 0px;
    font-size: 18pt;
  }

@media (max-width: 600px) {
  .display-1 {
    font-size: 2rem;
  }
  .subtitle-1 {
    font-size: 1rem;
  }

  .cajon-anuncio{
    padding-top: 5%;
  }

  .titulo-text{
    margin: 0px;
    font-size: 12pt;
  }

  .titulo-descripcion{
    margin: 0px;
    font-size: 11pt;
  }
}
</style>
