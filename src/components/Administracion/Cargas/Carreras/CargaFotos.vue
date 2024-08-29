<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex child-flex"
        cols="4"
        v-for="(item, i) in photos"
        :key="i"
      >
        <v-img :src="item.img" max-width="100" height="100" style="object-fit: cover">
          <v-btn
            @click="deletePhoto(i, item)"
            class="mx-1 img-close"
            dark
            small
            icon
            color="red"
          >
            <v-icon size="35" dark> mdi-close-circle </v-icon>
          </v-btn>
          <template v-slot:placeholder v-if="(loading = true)">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col class="d-flex child-flex" cols="4">
        <v-img
          class="file-upload"
          src="../../../../assets/add.jpg"
          ><input
            class="input-photo"
            type="file"
            ref="photo"
            accept="image/jpeg image/jpg image/png"
            value=""
            @click="$refs.photo.value = null"
            @change="uploadPhoto($event)"
          />
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import updatePhoto from "@/controller/update";
import api from "@/models/controller";
export default {
  props: ["categoria", 'listaphotos'],
  data: () => ({
    photos: [],
    loading: false,
  }),
  methods: {
    onInputClick: function (event) {
      event.target.value = "";
    },
    addImage: function () {
      this.photos.push({
        img: "https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg",
        id: "",
      });
    },

    uploadPhoto: function (e) {
     try {
        const { files } = this.$refs.photo;
        const file = files[0];
        updatePhoto(file, this.categoria).then((result) => {
          var dataimg = result;
          this.photos.push({
            img: dataimg.url,
            id: dataimg.id,
          });

          // localStorage.setItem('photos',this.photos);
          this.enviarFotos(this.photos);
        });
        //this.cargarImagen(file, i);

        e.currentTarget.files = null;
      } catch (error) {
        console.log("Error ", error);
      }

    },
    cargarImagen: function (file, i) {
      let reader = new FileReader();
      reader.onload = (y) => {
        //this.imagenMiniatura = y.target.result;
        this.photos[i].img = y.target.result;
      };
      reader.readAsDataURL(file);
    },

    deletePhoto: function (index, item) {
      let data = {
        id: item.id,
        categoria: this.categoria,
      };

      console.log("dfd ", data)

      api.deletePhoto(data).then(() => {
        this.photos.splice(index, 1);
        this.enviarFotos(this.photos);
      });
    },

    enviarFotos: function (datos) {
      this.$emit("photos", datos);
    },
    getCambio:function(){
      console.log("ID CATEGORIA : ", this.listaphotos)
    }
  },

  watch: {
    },
  created() {
    this.photos= this.listaphotos;
    this.$watch(
          () => this.listaphotos,
          (toParams) => {
            // react to route changes...
            this.photos= toParams;

          }
        );
  },
};
</script >

<style lang="scss" scoped>
.img-input {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-photo {
  width: 70px;
  height: 90px;
  background: red;

  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}

.file-upload {
  border-radius: 8px;
  width: 100%;
  /*border: 1px solid #01e934;*/
  /*border-radius: 100px;*/
  overflow: hidden;
  position: relative;
}
.file-upload input {
  position: absolute;
  height: 400px;
  width: 400px;
  left: -200px;
  top: -200px;
  background: transparent;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.file-upload img {
  height: 200px;
  width: 200px;
  margin: 10px;
  border-radius: 8px;
  color: rgb(241, 241, 6);
}

.img-close {
  position: absolute;
  top: 5px;
  right: 1px;
  height: 40px !important;

  z-index: 3;
  border-radius: 50%;
}
</style>

