<template>

        <v-dialog  v-model="dialog" fullscreen  transition="dialog-bottom-transition">
            <v-card class="portada-principal">
                <v-btn class="close" icon @click="salir()"> <v-icon size="40" style="color:white">mdi-close-circle</v-icon> </v-btn>
                        <v-img class="educacion" style="width: 100%; height:40%" v-for="(item, i) in galeria" :key="i" :src="item.img">
                        </v-img>

               
            </v-card>
        </v-dialog>

</template>

<script>
export default {
    props: ['value', 'galeria'],
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
    methods: {
        salir: function () {
            this.dialog = false;
            this.$emit("cerrar", false);
        },
    },

    created() {

        console.log(" Viene ", this.galeria, "INUT ", this.value);
        this.dialog = this.value;
    }
}
</script>

<style scoped>

.close{
    position:absolute;
    right: 15px;
    top:20px;
    z-index:10px
}

.portada-principal{
    background: black;
    position:relative;
}
.portada-principal .educacion {
    

    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4vh;
    color: white;
    line-height: 30px;
}

.fotos {
    position:relative;
    background: black;
    height: 100%;
    width: 100%;
}
</style>