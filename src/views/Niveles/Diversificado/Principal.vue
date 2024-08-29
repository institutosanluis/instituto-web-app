<template>
  <div>
    <Diversificado></Diversificado>
  </div>
</template>

<script>
import Diversificado from "@/components/Niveles/Diversificado";

export default {
  name: "Home",
  components: { Diversificado },
  data: () => ({
    typePortada: "Principal",
  }),
};
</script>

<style scoped></style>
