<template>
  <div>
    <v-app-bar style="background: #ffbb00 !important" dark app height="90">
      <v-toolbar-title class="mt-12" v-if="maxWidth > 700">
        <router-link to="/">
          <img
            style="width: 220px !important; height: 140px"
            src="../../assets/img/logos.png"
            alt="logo"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mt-12" v-if="maxWidth < 700">
        <router-link to="/">
          <img
            style="width: 220px !important; height: 140px"
            src="../../assets/img/logos.png"
            alt="logo"
          />
        </router-link>
      </v-toolbar-title>
      <v-icon
        dark
        prominent
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-none text-right"
        style="position: absolute; right: 5px; zoom: 1.5; z-index: 3"
        >mdi-menu</v-icon
      >
      <v-spacer></v-spacer>

      <router-link
        class="d-none d-sm-flex link-nav ml-8"
        style="color: #fff; margin-left: 5px; margin-right: 15px"
        to="/"
        >Inicio</router-link
      >
      <router-link
        class="d-none d-sm-flex link-nav ml-8"
        style="color: #fff; margin-left: 5px; margin-right: 15px"
        to="/niveles"
        >Niveles</router-link
      >
      <router-link
        class="d-none d-sm-flex link-nav ml-8"
        style="color: #fff; margin-left: 5px; margin-right: 15px"
        to="/eventos"
        >Eventos</router-link
      >
      <router-link
        class="d-none d-sm-flex link-nav ml-8"
        style="color: #fff; margin-left: 5px; margin-right: 15px"
        to="/admisiones"
      >
        <v-btn elevation="0" color="success">Admisión</v-btn>
      </router-link>
      <v-spacer v-if="maxWidth > 700"></v-spacer>
      <!--<v-btn to="/contacto" class="ml-4 mr-5 animated-shadow" rounded v-if="maxWidth>600"  color="blue">CONTACTAR</v-btn>-->
    </v-app-bar>

    <v-navigation-drawer right app v-model="drawer" fixed temporary width="315">
      <v-container class="text-center">
        <div class="close-menu-bar">
          <v-btn icon @click.stop="drawer = !drawer"> <v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-list flat>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "BarGeneral",

  data: () => ({
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    drawer: false,
    selectedItem: 1,
    items: [
      { text: "INICIO", to: "/" },
      { text: "NIVELES", to: "/niveles" },

      { text: "EVENTOS", to: "/eventos" },
      { text: "ADMISIONES", to: "/admisiones" },
   /*   { text: "CONCTACTO", to: "/contacto" },*/
    ],
  }),

  methods: {
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
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
  },
};
</script>

<style>
.close-menu-bar {
  width: 100%;
  text-align: right;
}

.link-nav {
  text-decoration: none !important;
  font-size: 14pt;
  font-weight: 800;
}

.link-nav:hover {
  color: rgb(75, 75, 75) !important;
}

.animated-shadow {
  color: #ffffff;

  font: normal 140px Varela Round, sans-serif;
  font-weight: bolder;
  height: 140px;

  left: 0;

  letter-spacing: 5px;

  text-align: center;

  text-transform: uppercase;

  animation: move linear 2000ms infinite;
  z-index: 2;
}

/*Animación para rotar las sombras*/
@keyframes move {
  0% {
    text-shadow: 4px -4px 0 #da0641, 3px -3px 0 #da0641, 2px -2px 0 #da0641,
      1px -1px 0 #da0641, -4px 4px 0 #13f1fc, -3px 3px 0 #13f1fc, -2px 2px 0 #13f1fc,
      -1px 1px 0 #13f1fc;
  }

  25% {
    text-shadow: -4px -4px 0 #13f1fc, -3px -3px 0 #13f1fc, -2px -2px 0 #13f1fc,
      -1px -1px 0 #13f1fc, 4px 4px 0 #da0641, 3px 3px 0 #da0641, 2px 2px 0 #da0641,
      1px 1px 0 #da0641;
  }

  50% {
    text-shadow: -4px 4px 0 #da0641, -3px 3px 0 #da0641, -2px 2px 0 #da0641,
      -1px 1px 0 #da0641, 4px -4px 0 #13f1fc, 3px -3px 0 #13f1fc, 2px -2px 0 #13f1fc,
      1px -1px 0 #13f1fc;
  }

  75% {
    text-shadow: 4px 4px 0 #13f1fc, 3px 3px 0 #13f1fc, 2px 2px 0 #13f1fc,
      1px 1px 0 #13f1fc, -4px -4px 0 #da0641, -3px -3px 0 #da0641, -2px -2px 0 #da0641,
      -1px -1px 0 #da0641;
  }

  100% {
    text-shadow: 4px -4px 0 #da0641, 3px -3px 0 #da0641, 2px -2px 0 #da0641,
      1px -1px 0 #da0641, -4px 4px 0 #13f1fc, -3px 3px 0 #13f1fc, -2px 2px 0 #13f1fc,
      -1px 1px 0 #13f1fc;
  }
}
</style>
