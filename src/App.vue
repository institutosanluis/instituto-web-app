<template>
  <v-app id="app">
    <Bar></Bar>
    <v-main class="main-back">
      <router-view></router-view>
      <div class="text-center">
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        
        </v-overlay>
      </div> 
    </v-main>
    <v-footer 
    dark
    padless
    
  >
    <v-card style="width: 100%;" color="#ffbb00"
      flat
      tile
      class=" white--text text-center"
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
     <v-icon>mdi-phone-classic</v-icon> 2222-2222
      </v-col>
      <v-col cols="12" sm="4">
        <v-icon>mdi-email</v-icon> correoestablecimiento@gmail.com
    </v-col>
    <v-col cols="12" sm="4">
      <v-icon>mdi-directions-fork </v-icon>  Aldea San Luis, San Sebastián, Retalhuleu
    </v-col>
      </v-row>
     </v-card-text> 

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>GUATEMALA</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import Bar from '@/components/AppBar/BarGeneral.vue'

export default {
  name: 'App',
  components: { Bar },
  data: () => ({
    //
    icons: [
        'mdi-facebook',
        'mdi-twitter',
       
        'mdi-instagram',
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
        }, 3000);
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
</style>
