<template>
    <v-dialog v-model="show" fullscreen>
        <v-card tile class="contenedorPadre" >
            <v-img :src="foto" class="contenedorHijo size" >
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                    <v-spacer></v-spacer>
                    <v-btn @click="show = false" icon><v-icon size="40" color="red">mdi-close-circle</v-icon></v-btn>
                </v-app-bar>
            </v-img>


        </v-card>
    </v-dialog>
</template>
<script>
export default {

    props: {
        value: Boolean,
        foto: null
    },
    data() {
        return {
            dialog: false,
        }
    },

    methods: {
        salir() {
            this.$router.push("/").catch(() => { });
        },
        repetir() {
            this.$router.go();
        }
    },
    computed: {
        show: {
            get() {

                return this.value;
            },
            set(value) {
                this.$emit("input", value);


            },

        },
    },
}
</script>

<style scoped>
.btn-closes {
    display: grid;
    margin: 0 auto;
    background: white;
    position: absolute;
    top: 15px;
    border-radius: 50% !important;
    right: 15px;
    z-index: 5;
    width: 38px;
    height: 38px;
}

.img-center-product {
    position: absolute;
    bottom: 10px;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;

    margin: auto;
}

.contenedorPadre {
    position: relative;
    display: grid;
    background-color: black !important;
}

.contenedorHijo {
    margin: auto;
}

.btn-close-foto {
    background: white;
    border-radius: 50%;
}


@media screen and (min-width: 550px) {
    .size{
    width: 50%;
}
}

</style>