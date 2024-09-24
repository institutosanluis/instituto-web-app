<template>
  <div>
    <div v-if="noticias.length == 0">
      <v-card cols="12" v-for="(item, i) of [0, 1, 2, 3]" :key="i" class="mx-auto my-5 rounded-xl">
        <v-row no-gutters>
          <v-col cols="12">
            <v-skeleton-loader
              class="mx-auto"
              
              type="card"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div v-else>
      <v-card v-for="(item, i) in noticias" :key="i" class="mx-auto my-5 rounded-xl">
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
                    @click="verFotosDialog(item.galeria)"
                    :src="media.url"
                    class="gallery-item"
                    max-height="300"
                    contain
                  ></v-img>

                  <div
                    v-if="extractedText(media.tipo) == 'video/'"
                    style="border-radius: 10px"
                  >
                    <video controls :style="{ width: '100%', height: '100%' }">
                      <source :src="media.url" type="video/mp4" />
                      Tu navegador no soporta la reproducción de videos.
                    </video>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn color="white" class="rounded-0" block
              ><v-icon>mdi-share</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
    <fotos :galeria="galeria" :dialog.sync="isDialogVisible"></fotos>
  </div>
</template>
<script>
import api from "@/models/controller";
import fotos from "./VerFotos.vue";
export default {
  name: "Principal",
  components: { fotos },
  data: () => ({
    noticias: [],
    isDialogVisible: false,
    galeria: [],
  }),
  methods: {
    verFotosDialog(item) {
      this.galeria = [];
      this.isDialogVisible = true;
      this.galeria = item;
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
    extractedText(tipo) {
      return tipo.substring(0, 6); // Extrae "Este "
    },
    getAllNoticias() {
      try {
        api.allNoticias().then((re) => {
          var listado = [];
          var data = re.data;
          listado = data.result;
          this.noticias = listado;

          this.noticias.sort((a, b) => new Date(b.fechahora) - new Date(a.fechahora));
        });
      } catch (error) {
        alert("Error ocurrido, recarga nuevamente");
      }
    },

    formatFecha(item) {
      return new Date(item).toLocaleDateString();
    },
    formatHora(item) {
      return new Date(item).toLocaleTimeString();
    },
  },
  beforeDestroy() {
    this.getAllNoticias();
  },
  created() {
    this.getAllNoticias();
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.image {
  width: 100%;
  height: auto;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  text-align: center;
}

.gallery-item {
  border-radius: 2px;
  overflow: hidden;
}
</style>
