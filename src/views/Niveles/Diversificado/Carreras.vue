<template>
    <v-container>
        <div class="header">
            <p class="header-title">NUESTRAS CARRERAS</p>
        </div>
        <br>

        <div class="titulo-pensum">
            <p class="pensum">PENSUM DE CARRERAS</p>
            <hr>
        </div>

        <v-row v-for="(item, i) in  carreras" :key="i">
            <v-container>
                <v-row class="mb-8 mt-8" v-if="i % 2">
                    <v-col cols="12" md="12">
                        <p style="text-align: center !important" class="titulo-carrera">{{ item.carrera }} <span
                                v-if="item.orientacion != 'Ninguna'"> Con
                                Orientación {{ item.orientacion }}</span>

                        <ul class="nav">
                            <li>
                                <div id="circle"></div>
                            </li>
                            <li>
                                <div id="circle"></div>
                            </li>
                            <li>
                                <div id="circle"></div>
                            </li>
                        </ul>

                        </p>

                    </v-col>
                    <v-col cols="12" md="9">

                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4" v-for="(grado, i ) in  getlist(item.grados)" :key="i">
                                    <div class="cajon-grados">

                                        <p class="titulo-grados">{{ grado.grado }} <span>{{ grado.abr }} {{ grado.nivel
                                        }}</span> </p>
                                        <div>
                                            <p style="font-weight:bolder">ÁREAS Y SUB-ÁREAS</p>
                                            <ul v-for="(area, i ) in grado.areas" :key="i">
                                                <li> {{ area.area }}</li>
                                            </ul>

                                        </div>
                                    </div>
                                </v-col>

                            </v-row>
                        </v-container>

                    </v-col>
                    <v-col cols="12" md="3">
                        <v-img height="350px" :src="item.img" style="border-radius: 10px;"></v-img>
                    </v-col>

                </v-row>

                <v-row class="mb-8 mt-8" v-else>
                    <v-col cols="12" md="12">
                        <p style="text-align: center !important" class="titulo-carrera">{{ item.carrera }} <span
                                v-if="item.orientacion != 'Ninguna'"> Con
                                Orientación {{ item.orientacion }}</span> </p>
                                <ul class="nav">
                            <li>
                                <div id="circle"></div>
                            </li>
                            <li>
                                <div id="circle"></div>
                            </li>
                            <li>
                                <div id="circle"></div>
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-img height="350px" :src="item.img" style="border-radius: 10px;"></v-img>
                    </v-col>
                    <v-col cols="12" md="9">

                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4" v-for="(grado, i ) in  getlist(item.grados)" :key="i">
                                    <div class="cajon-grados">

                                        <p class="titulo-grados">{{ grado.grado }} <span>{{ grado.abr }} {{ grado.nivel
                                        }}</span> </p>
                                        <div>
                                            <p style="font-weight:bolder">ÁREAS Y SUB-ÁREAS</p>
                                            <ul v-for="(area, i ) in grado.areas" :key="i">
                                                <li> {{ area.area }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>

<script >
import api from '@/models/controller'

export default {
    name: 'Carreras',

    components: {

    },

    data: () => ({
        maxHeight: 0,
        maxWidth: window.innerWidth,
        scrollY: 0,
        carreras: [/*{ id: 1, title: 'Básico', grado: '1', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' },
        { id: 2, title: ' Básico', grado: '2', abr: 'do', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' },
    { id: 3, title: 'Básico', grado: '3', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' }*/]

    }),
    methods: {

        getlist(item) {
            var array = []
            for (let i in item) {
                array.push(item[i])
            }

            return array;

        },
        irAgregar(item) {
            var orientacion = ''
            var carrera = '';

            if (item.orientacion != 'Ninguna') {
                orientacion = ' Con Orientacion en ' + item.orientacion;
            }

            carrera = item.carrera + orientacion;

            this.$router.push({ path: `/administrador/cargar/carreragrado/${item.id}/${carrera}` });
        },
        getGrados() {
            api.getDiverCarreras().then((re) => {
                this.carreras = [];
                var data = re.data;
                for (let i in data) {
                    this.carreras.push(data[i])
                }
            })
        }
        ,
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
        this.getGrados();
    }
}
</script>

<style scoped>
.titulo {

    font-size: 1.4vh !important;
    line-height: 20px !important;

}

.header {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 1px;
    background: rgb(25, 163, 255);
    text-align: center
}

.header-title {
    font-weight: bolder;
    font-size: 4vh;
    margin-bottom: 0px;
    margin-top: 3px;
    color: white;
}

.titulo-carrera {
    font-weight: bolder;
    text-align: center;
    font-size: 3vh
}

.cajon-grados {
    border-radius: 10px;
    padding: 10px;
    background: white;
}

.titulo-grados {
    font-weight: bolder;
    text-align: center;
    font-size: 20pt;
}

.titulo-pensum {
    padding-left: 10%;
    padding-right: 10%;
    text-align: center;
    font-size: 2.8vh;
    font-weight: bolder;
}

@media screen and (min-width: 550px) {
    .header {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 8px;

        background: rgb(25, 163, 255);
        ;
        text-align: left;
    }

    .titulo-carrera {
        font-weight: bolder;
        text-align: center;
        font-size: 4vh
    }

    .titulo {

        font-size: 3vh !important;
        line-height: 20px !important;

    }

    .titulo-grados {
        font-weight: bolder;
        text-align: center;
        font-size: 4vh;
    }

    .titulo-pensum {
        padding-left: 20%;
        padding-right: 20%;
        text-align: center;
        font-size: 5vh;
        font-weight: bolder;
    }
}

.nav {
    margin-top:-10px !important;

    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
}

.nav li {
    display: inline-block;
    font-size: 20px;
    padding: 0px;
}

#circle {
    background: #ffbb00;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 6px;
    display: flex;
    /*Convertimos al menú en flexbox*/
    justify-content: space-between;
    /*Con esto le indicamos que margine todos los items que se encuentra adentro hacia la derecha e izquierda*/
    align-items: center;
    /*con esto alineamos de manera vertical*/
}</style>