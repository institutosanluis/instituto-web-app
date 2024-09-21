<template>
  <div>
    <v-app id="app">
      <div class="text-center" v-if="overlay">
        <v-overlay absolute :value="overlay" >
         
         <div style="width: 100%; justify-content: center;  display: flex;   align-items: center;">
          <v-img max-width="250" src="./assets/logo.png"></v-img>
         </div>
  
          <p class="text-lg-h2 font-weight-black">BIENVENIDOS</p>
          <v-progress-linear
            indeterminate
            size="64"
            color="yellow darken-2"
          ></v-progress-linear>
        </v-overlay>
      </div>
      <div v-else>
        <Bar></Bar>
        <v-main class="main-back">
          <router-view></router-view>
        </v-main>
        <v-footer dark padless>
          <v-card
            style="width: 100%"
            color="#ffbb00"
            flat
            tile
            class="white--text text-center"
          >
            <v-card-text>
              <v-btn
                v-for="icon in icons"
                :key="icon"
                href="https://www.facebook.com/profile.php?id=100057212871064"
                class="mx-4 white--text"
                icon
              >
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
              <v-row>
                <v-col cols="12" sm="4">
                  <v-icon>mdi-phone-classic</v-icon>(+502) 5993-4990
                </v-col>
                <v-col cols="12" sm="4">
                  <v-icon>mdi-email</v-icon> imedsanluis@hotmail.com
                </v-col>
                <v-col cols="12" sm="4">
                  <v-icon>mdi-directions-fork </v-icon> Aldea San Luis, San Sebastián,
                  Retalhuleu
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} —
              <strong>San Sebastián, Retalhuleu, Guatemala</strong>
            </v-card-text>
          </v-card>
        </v-footer>
      </div>
    </v-app>
  </div>
</template>

<script>
import Bar from "@/components/AppBar/BarGeneral.vue";

export default {
  name: "App",
  components: { Bar },
  data: () => ({
    //
    icons: [
      "mdi-facebook",
      /* 'mdi-twitter',
       
        'mdi-instagram',*/
    ],
    overlay: false,
  }),
  beforeCreate() {
    this.overlay = true;
  },
  created() {
    this.overlay = true;
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 4000);
    },
  },
};
</script>

<style>
body {
  margin: 0;

  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: rgb(246, 253, 253) !important;
  min-height: 100vh;
}

.main-back {
  height: 100% !important;
  background: rgb(244, 253, 253) !important;
}

.v-overlay {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center;    /* Centrar verticalmente */
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
}
</style>
