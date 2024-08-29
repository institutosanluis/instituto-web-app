<template>
    <div>

        <p class="title-niveles">TALLERES</p>
        <div>
            <v-row class="fill-height" align="center" justify="center">
                <template v-for="item in talleres">
                    <v-col  cols="12" md="4">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                                <v-img class="portada-principal" 
                                    :src="item.src" height="385px">
                                    <div class="educacion">
                                        <p class="mt-4 title-education">
                                            {{ item.title }}
                                        </p>
                                        <v-btn class="btn-detalles"  :class="{ 'show-btns': hover }">
                                            Más detalles
                                        </v-btn>
                                    </div>

                                </v-img>
                            </v-card>
                        </v-hover>
                    </v-col>
                </template>
            </v-row>
        </div>

    </div>
</template>

<script >


export default {
    name: 'HomeN',

    components: {
    },
    data: () => ({

        talleres: [{ id: 1, title: 'Computación', src: 'https://prensa.municipalidadsalta.gob.ar/wp-content/uploads/2022/11/computacion-3.jpg' },
        { id: 2, title: 'Cocina', src: 'https://images.hola.com/images/026b-12bca2955158-b6b0d3608c15-1000/horizontal-480/ni-os-cocinando-en-casa-con-gorritos-y-delantal-.jpg' }]

    }),
}
</script>

<style scoped>
.title-niveles {
    font-size: 18pt;
    font-weight: bolder;
}

.v-card {
    transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
    opacity: 0.6;
}

.show-btns {
    color: rgba(255, 255, 255, 1) !important;
}

.portada-principal {
    position: relative;
}



.portada-principal .educacion {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: white;
    line-height: 30px;
}

.title-education {
    font-size: 5vh !important;
}

.btn-detalles{
    border-radius:10px;
    background:orange !important;
    color:white;
}
</style>