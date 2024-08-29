<template>
  <div>
    <Portada v-model="typePortada"></Portada>
    <br>

    <Cuerpo></Cuerpo>
    <!--<Eventos></Eventos>-->
  </div>
</template>
  
<script >

import Portada from '@/components/Principal/Portada.vue'
import Cuerpo from '@/components/Principal/Home.vue'
import Eventos from '@/components/Principal/Eventos/Principal.vue'


export default {
  name: 'Home',

  components: {
    Portada,
    Cuerpo,
    Eventos,
  },
  data: () => ({
    typePortada: 'principal'
  }),
}
</script>

<style scoped></style>