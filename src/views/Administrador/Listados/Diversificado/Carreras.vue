<template>
    <v-container>
        <div class="header">
            <p class="header-title">Carreras Disponibles</p>
        </div>
        <br>
        <v-row>
            <v-col cols="6" md="4" v-for="(item, i) in carreras" :key="i">
                <v-card @click="irAgregar(item)" max-width="375" class="mx-auto">
                    <v-img :src="item.img" :height="maxWidth < 700 ? '200' : '320'" dark>

                    </v-img>

                    <v-card-title class="black--text pl-1 pt-2 ">
                        <div class="titulo pl-1 ">
                            {{ item.carrera }}
                        </div>
                        <br v-if="item.orientacion == 'Ninguna'">
                        <span class="titulo" v-if="item.orientacion != 'Ninguna'"> Con Orientación {{ item.orientacion
                        }}</span>
                    </v-card-title>

                </v-card>
            </v-col>
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
                console.log("R -", this.carreras)
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
    border-radius: 15px;
    background: rgb(224, 224, 224);
    text-align: center
}

.header-title {
    font-weight: bolder;
    font-size: 4vh;
    margin-bottom: 0px;
    margin-top: 3px;
}

@media screen and (min-width: 550px) {
    .header {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 1px;
        border-radius: 15px;
        background: rgb(224, 224, 224);
        text-align: left;
    }

    .titulo {

        font-size: 3vh !important;
        line-height: 20px !important;

    }
}
</style>