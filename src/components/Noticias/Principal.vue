<template>
  <div>
    <v-card v-for="(item, i) in noticias" :key="i" class="mx-auto my-5 rounded-xl">
      <!-- Si el array tiene solo una imagen, mostrarla en una columna -->

      <v-row
        no-gutters
        v-if="item.galeria.length === 1"
        class="justify-center"
        style="margin: 0px"
      >
        <v-col cols="12" class="px-3 pt-3">
          <p>
            <v-icon>mdi-earth</v-icon>
            <span style="font-size: 12px">
              {{ formatFecha(item.fechahora) }} - {{ formatHora(item.fechahora) }}</span
            >
          </p>
          <p class="font-weight-medium">{{ item.publicacion }}</p>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div style="width: 100%; height: 550px">
            <v-img
              @click="verFotosDialog(item.galeria)"
              style="width: 100vh; height: 100%"
              :src="item.galeria[0].url"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn color="white" block><v-icon>mdi-share</v-icon></v-btn>
        </v-col>
      </v-row>

      <!-- Si el array tiene más de una imagen, mostrar dos columnas -->
      <v-row no-gutters v-else class="justify-center">
        <v-col cols="12" class="px-3 pt-3">
          <p>
            <v-icon>mdi-earth</v-icon>
            <span style="font-size: 12px">
              {{ formatFecha(item.fechahora) }} - {{ formatHora(item.fechahora) }}</span
            >
          </p>
          <p class="font-weight-medium">{{ item.publicacion }}</p>
        </v-col>
        <v-col
          v-for="(photo, i) in item.galeria"
          :key="i"
          cols="6"
          class="d-flex justify-center"
          style="border-radius: 15px !important"
        >
          <div style="width: 100%; height: 550px">
            <v-img
              @click="verFotosDialog(item.galeria)"
              :gradient="i % 2 ? 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)' : ''"
              style="width: 100vh; height: 100%"
              :src="photo.url"
            >
              <!-- Texto centrado en la imagen -->
              <div v-if="i % 2" class="centered-text">
                <v-card-text class="text-h5 white--text">
                  <v-btn outlined dark @click="verFotosDialog(item.galeria)"
                  >Ver más</v-btn
                  >
                </v-card-text>
              </div>
            </v-img>
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn color="white"  block><v-icon>mdi-share</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card>

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
    getAllNoticias() {
      try {
        api.allNoticias().then((re) => {
          var listado = [];
          var data = re.data;
          listado = data.result;

          for (let item in listado) {
            api.allGaleriaNoti(listado[item].id).then((res) => {
              var galeria = res.data;
              var photos = galeria.result;

              this.noticias.push({
                fechahora: listado[item].fechahora,
                id: listado[item].id,
                publicacion: listado[item].publicacion,
                galeria: photos,
              });

              this.noticias.sort((a, b) => new Date(b.fechahora) - new Date(a.fechahora));
            });
          }
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
</style>
