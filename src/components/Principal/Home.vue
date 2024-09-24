<template>
  <div>
    <div class=" px-lg-16 px-sm-10 px-3" v-if="active">
      <Anuncios></Anuncios>
    </div>

    <div class="px-3">
      <Informacion></Informacion>
    </div>
    <!-- FRANJA SUPERIOR    #ffbb00 -->

    <div style="height: 100%; background: rgba(21, 200, 255, 0.9)">
      <div class="text-center pb-10 mt-1 px-3 pt-5">
        <Niveles></Niveles>
      </div>
    </div>

    <!-- FRANJA MEDIO -->
    <div class="text-center">
      <Franja :modulo="'principal'" :posicion="'center'"></Franja>
    </div>

    <div style="height: 100%; background: white !important;" class="px-3 text-center" >
        <Infraestructura></Infraestructura>
    </div>
  <!--  <div style=" background: rgb(196, 196, 196);"  class="text-center px-3">
      <Resenias></Resenias>
    </div> -->

    <div class="text-center mb-8">
      <Noticias></Noticias>
    </div>
    <!--FRANJA INFERIOR -->
    <div class="text-center mb-8 mt-8">
      <Ubicacion></Ubicacion>
    </div>

   <!-- <div>
    <Seccion></Seccion>
    </div> -->
  </div>
</template>

<script>
import Anuncios from "@/components/Principal/Anuncios/Listado.vue";
import Niveles from "@/components/Principal/Niveles/Home.vue";
import Franja from "@/components/Principal/Franjas/Franja.vue";
import Infraestructura from "@/components/Principal/Infraestructura/Infra.vue";
import Informacion from "@/components/Principal/DetallesEstablecimiento/Informacion.vue";
import Pilares from "@/components/Principal/DetallesEstablecimiento/Pilares.vue";
import Resenias from "@/components/Principal/Resenias/Listar.vue";
import Noticias from "@/components/Principal/Noticias/Principal.vue";
import Ubicacion from "@/components/Principal/Ubicacion/Mapa.vue";
import Seccion from "@/components/Principal/Diagonal/Seccion.vue";
import api from "@/models/controller";

export default {
  name: "Home",
  components: {
    Seccion,
    Anuncios,
    Informacion,
    Niveles,
    Pilares,
    Noticias,
    Infraestructura,
    Franja,
    Ubicacion,
    Resenias,
  },
  data: () => ({
    active: false
  }),
  methods : {
    getAnuncios(){
        api.allAnuncioTotal().then((re)=>{
         if(re.data){
          var data = re.data;
          this.active = data.result;
         }
        })
    }
  },
  beforeDestroy(){
    this.getAnuncios();
  },
  created(){
this.getAnuncios();
  }
};
</script>

<style scoped>
.title-establecimiento {
  font-weight: bolder;
  margin-bottom: -8px;
  line-height: 30px !important;
}

.info-establecimiento {
  background-color: white !important;
  border-radius: 10px;

  color: rgba(255, 196, 0, 0.918)
}
</style>
