<template>
  <div> 
    <Grado :id="$route.params.tipo" :idGrado="$route.params.carrera"></Grado>
  </div>
</template>

<script>
import Grado from "@/components/Niveles/Grados/Grado.vue";

export default {
  name: "Home",
  components: { Grado },
  props: { id: null, idGrado: null },
  data: () => ({
    typePortada: "Principal",
  }),
};
</script>

<style scoped></style>
