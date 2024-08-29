<template>
    <div class="portada-principal">
        <Portada v-model="typePortada"></Portada>
        <div class="detalle-jornadas py-8 px-10">

            <v-row>
                <v-col cols="12" md="6">
                    <div class="title-jornadas">
                        <p class="contenido-jornada">
                            JORNADAS
                            <br>
                            <span
                                style="line-height: 10px; font-size: 12pt !important; color: white; margin-top: -15px !important;">
                                Jornadas Disponibles
                            </span>
                        </p>

                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="title-jornadas pl-10">
                        <ul class="lista-jornadas ul-list" style="width: 100% !important;">
                            <li>
                                MATUTINA | DIVERSIFICADO
                            </li>
                            <li> VESPERTINA | BÁSICO</li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
        </div>

        <br>
        <Basico></Basico>
        <br>
        <Diversificado></Diversificado>

    </div>
</template>
  
<script >

import Portada from '@/components/Principal/Portada.vue'
import Basico from '@/components/Niveles/Basico'
import Diversificado from '@/components/Niveles/Diversificado'

export default {
    name: 'Nivel',
    components: { Portada, Basico, Diversificado },
    data: () => ({
        maxHeight: 0,
        maxWidth: window.innerWidth,
        scrollY: 0,
        typePortada: 'niveles'
    }),

    methods: {

        onResize() {
            this.maxWidth = window.innerWidth;
        },

        onResize1() {
            this.scrollY = window.scrollY;
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
        window.removeEventListener("resize", this.onResize);
    },

    created() {
        this.maxHeight = screen.height;

    }
}
</script>

<style scoped>
@media screen and (max-width: 550px) {
    .ul-list {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

@media screen and (min-width: 550px) {
    .educacion {
        font-size: 10vh !important;
        line-height: 65px !important;
    }

    .ul-list {
        text-align: left !important;
        display: inline;
    }

}

.portada-principal {
    position: relative;
}

.portada-principal .educacion {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4vh;
    color: white;
    line-height: 30px;
}

.title-jornadas {
    position: relative;
    width: 100%;
    height: 80px;
}

.title-jornadas .contenido-jornada {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 7vh;
    color: rgb(33, 6, 97);
    line-height: 30px;
}


.title-jornadas .lista-jornadas {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: white;
    line-height: 30px;
}

.detalle-jornadas {
    background: rgb(25, 163, 255);

    color: white;
    font-weight: bolder;
}
</style>
  