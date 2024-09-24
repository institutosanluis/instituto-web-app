<template>
  <div>
    <v-img :height="maxWidth < 700 ? 270 : conNumber(infra.alto)" :src="infra.url" class="img-style">
      <div class="title-infra">
        <p class="title-portada">{{ infra.titulo }}</p>
      </div>
    </v-img>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "Infra",
  props: ["modulo", "posicion"],
  data: () => ({
    maxHeight: 0,
    maxWidth: window.innerWidth,
    scrollY: 0,
    infra: {},
  }),
  components: {},

  methods: {

    conNumber(valor){
        return Number(valor);
    },
    onResize() {
      this.maxWidth = window.innerWidth;
    },

    onResize1() {
      this.scrollY = window.scrollY;
    },

    getInfra() {
      if (this.modulo != null) {
        api
          .getPositionFranja(this.modulo, this.posicion)
          .then((re) => {
            var vm = re.data;
            this.infra = vm.result;
            console.log(re.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
    this.getInfra();
    window.removeEventListener("resize", this.onResize);
  },

  created() {
    this.maxHeight = screen.height;
    this.getInfra();
  },
};
</script>

<style scoped>
.title-infra {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.title-portada {
  margin: 0px auto;
  color: white;
  font-weight: bolder;
  font-size: 6vh;
}

.title-infra .title-portada {
  text-align: center;
  position: absolute;
  font-weight: bolder;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6vh;
  color: white;
  line-height: 70px;
}

.img-style {
  background-position-y: center;
  object-position: -100px -40px;
}

@media screen and (min-width: 550px) {
  .title-portada {
    font-size: 8vh;
  }

  .img-style {
    object-position: -600px -400px;
  }

  .title-infra {
    background: rgba(0, 0, 0, 0.3);
  }

  .title-infra .title-portada {
    font-size: 10vh;
  }
}
</style>
