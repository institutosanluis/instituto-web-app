<template>
    <div>
        <div>
            <div class="portada-principal">

                <v-parallax :height="maxWidth < 700 ? '200' : '300'" src="../../../assets/img/eventos.jpg">
                    <span class="educacion">Ultimas Noticias</span>
                </v-parallax>
            </div>

            <v-slide-group v-model="slideGroup" class="px-5 my-3">
                <v-slide-item v-for="n in eventos" :key="n.id" class="mx-5 my-2">

                    <v-card elevation="0" class="tamanio-card">
                        <v-card-text>
                            <v-img :src="n.galeria[0].url" height="390" max-width="100%">
                            </v-img>
                        </v-card-text>
                        <v-card-text>
                            <p class="contenido">{{ n.descripcion }}</p>

                            <a style="text-align: left !important; color: orange; font-weight: bolder;">VER MÁS</a>
                        </v-card-text>
                    </v-card>
                </v-slide-item>
            </v-slide-group>

            <v-btn dark rounded color="orange" style="font-weight: bolder;"> VER MÁS NOTICIAS</v-btn>
        </div>
        <Galeria v-on:cerrar="onClose" v-model="activeGaleria" v-if="activeGaleria == true" :galeria="this.galeria">
        </Galeria>
    </div>
</template>

<script >
import api from '@/models/controller'
import Galeria from '@/components/Galeria/Galeria.vue'


export default {
    name: 'Principal',
    components: { Galeria },
    data: () => ({
        slideGroup: 0,
        eventos: [{ id: 1, src: 'https://scontent.fgua10-1.fna.fbcdn.net/v/t39.30808-6/375865894_802061705044251_171491019751972731_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=5OI2FMl_IvUAX8TyKBu&_nc_ht=scontent.fgua10-1.fna&oh=00_AfC4Ypkg94cieaAgAAGZOQ_L3qR-_VS7TbQBChwhxcaZXg&oe=650AECCA', title: 'Imposición de Bandas' },
        { id: 2, src: 'https://scontent.fgua10-1.fna.fbcdn.net/v/t39.30808-6/339065695_171916055316080_7966041197816541738_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5614bc&_nc_ohc=uH6NdrvuSZ0AX9yrolD&_nc_ht=scontent.fgua10-1.fna&oh=00_AfABzz3siPWjiOL4zHByPe3pyHXO4AWgBSTV51h2i8bIEQ&oe=650A734D', title: 'Imposición de Bandas' },
        { id: 3, src: 'https://scontent.fgua10-1.fna.fbcdn.net/v/t39.30808-6/338184806_172268242305303_4315632450308213898_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5614bc&_nc_ohc=G5Tk33hjPQoAX9z8CLV&_nc_ht=scontent.fgua10-1.fna&oh=00_AfA75Ho1uPLCraqj9QFovm-yCPSp9gBv9LMQZydIpb_M0g&oe=650A2EC4', title: 'Imposición de Bandas' }], maxHeight: 0,
        maxWidth: window.innerWidth,
        scrollY: 0,
        portada: {},
        eventos: [],
        activeGaleria: false,
        galeria: null,
    }),


    methods: {
        onClose(data) {
            console.log("Datos foto ", data)
            this.activeGaleria = false;
            this.galeria = null;
        },
        verGaleria(item) {
            this.activeGaleria = true;
            this.galeria = item;
            console.log("Datos de galeria :", this.galeria)
        },

        onResize() {
            this.maxWidth = window.innerWidth;
        },

        onResize1() {
            this.scrollY = window.scrollY;
        },


        getPortada(type) {
            api.getPortadas(type).then((re) => {
                var portada = re.data;
                this.portada = portada;
                console.log("Portada ", portada)
            })
        },

        getEventosActividades() {
            api.getEventosActividades().then((re) => {
                this.eventos = [];

                console.log(re)
                var data = re.data;
                for (let i in data) {
                    this.eventos.push(data[i])
                }

                this.eventos = this.eventos.reverse()
            })
        },

        getNoticias() {
            this.slideGroup = 0
            window.setInterval(() => {
                this.slideGroup++
                if (this.slideGroup == 5) {
                    this.slideGroup = 0;
                    this.eventos = this.eventos.reverse()
                }
            }, 2000)
        }
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
        this.getPortada(this.value);
        this.getEventosActividades();
        this.getNoticias();

    }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {}


.portada-principal {
    position: relative;
}


.contenido {
    text-align: left;
    color: black;
    font-weight: bolder;
    font-size: 12pt;
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

.cajon-descripcion {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    margin-bottom: -20px;
    font-weight: bolder;
}


.tamanio-card {

    max-width: 295px;
    background: rgb(255, 255, 255) !important;
}

.cajon-ver-mas {
    padding-top: 60px;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 10, 0.5);
    ;
}

.cajon-ver-mas-eventos {
    padding-top: 120px;
    background: rgba(10, 10, 10, 0.5);
    ;
    width: 100%;
    height: 100%;

}

.btn-ver-mas {
    margin: 0px auto;
    font-size: 13pt;
    color: white;
    font-weight: bolder;
}

.btn-ver-mas-eventos {
    margin: 0px auto;
    font-size: 13pt;
    color: white;
    font-weight: bolder;
}


@media screen and (min-width: 550px) {

    .tamanio-card {

        max-width: 400px;
        background: rgb(255, 255, 255) !important;
    }

    .educacion {

        font-size: 10vh !important;
        line-height: 65px !important;

    }

    .cajon-ver-mas {
        padding-top: 100px;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 10, 0.5);
        ;
    }

}
</style>