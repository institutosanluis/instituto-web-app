<!-- ChildComponent.vue -->
<template>
  <div>
    <v-dialog
      v-model="isDialogOpen"
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="d-flex justify-center " color="black"  style="position: relative;">
        <v-btn @click="closeDialog()" icon  style="position: absolute; top:5px; right: 5px;" dark color="red"><v-icon size="40">mdi-close-circle</v-icon></v-btn>
        <v-carousel :show-arrows="false" >
          <v-carousel-item v-for="(item, i) in galeria" :key="i">
    
            <div class="image-wrapper">
              <v-img :src="item.url" class="image-full" contain></v-img>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    galeria: {
      type: Array,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isDialogOpen: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit("update:dialog", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>
<style scoped>
.image-wrapper {
  width: 100%;
  height: 100%; /* Altura fija para el contenedor */
  position: relative;
  overflow: hidden;
}

.image-full {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Asegura que toda la imagen se ajuste dentro del div */
}
</style>
