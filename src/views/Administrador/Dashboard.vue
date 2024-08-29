<template>
    <v-container>
        <div class="bienvenida">
            <p class="header">¡Hola, bienvenido!</p>
        </div>

        <br>

        <div>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card elevation="2">
                            <div class="contenedor">
                                <p class="title-row">Niveles</p>
                                <v-row>
                                    <v-col cols="12" md="12" v-for="(item, i ) in niveles" :key="i">
                                        <v-card elevation="2" class="px-5 py-5" @click="navegarNivel(item.titulo)">
                                            <h4>{{ item.titulo }}</h4>
                                            <br>
                                            <v-list>


                                                <v-list-group v-for="(grado, i) in  getGrados(item)" :key="i"
                                                    :value="false">
                                                    <template v-slot:activator>
                                                        <v-list-item-avatar>
                                                            <v-img :src="grado.img"></v-img>
                                                        </v-list-item-avatar>
                                                        <v-list-item-title>{{ getGradoNombre(item,
                                                            grado) }}</v-list-item-title>
                                                    </template>


                                                    <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                                                        <v-list-item-title v-text="title"></v-list-item-title>

                                                        <v-list-item-icon>
                                                            <v-icon v-text="icon"></v-icon>
                                                        </v-list-item-icon>
                                                    </v-list-item>

                                                </v-list-group>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="6">
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card elevation="2">
                                        <div class="contenedor">
                                            <p class="title-row">Portadas</p>
                                            <v-list>
                                                <v-subheader>MÓDULOS</v-subheader>
                                                <v-list-item v-for="(item, i) in portadas" :key="i"
                                                    @click="getPortada(item)">
                                                    <v-list-item-avatar>
                                                        <v-img :src="item.url"></v-img>
                                                    </v-list-item-avatar>

                                                    <v-list-item-content>
                                                        <v-list-item-title v-html="item.id"></v-list-item-title>
                                                        <v-list-item-subtitle v-html="item.titulo"></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    <v-list-item-icon>
                                                        <v-icon>
                                                            mdi-arrow-right-thin
                                                        </v-icon>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </div>

                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card elevation="2">
                                        <div class="contenedor">
                                            <p class="title-row">Eventos</p>
                                            <v-list>
                                                <v-subheader>GESTIONES</v-subheader>
                                                <v-list-item-group v-model="selectedItem" color="primary">
                                                    <v-list-item v-for="(item, i) in items" :key="i"
                                                        @click="activeDialogMulti(item.href)">
                                                        <v-list-item-icon>
                                                            <v-icon v-text="item.icon"></v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="item.text"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>

                                            <Evento v-model="activeMultimedia"></Evento>
                                        </div>
                                    </v-card>

                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>

                </v-row>
            </v-container>

        </div>

    </v-container>
</template>
<script >
import api from '@/models/controller'
import Evento from '@/components/Administracion/Cargas/Multimedia/Archivo.vue'

export default {
    name: 'HomeN',

    components: {
        Evento
    },
    data: () => ({
        selectedItem: null,
        activeMultimedia: null,
        items: [
            { text: 'Subir Evento', icon: 'mdi-plus-circle', href: 'subir' },
            { text: 'Ver Eventos', icon: 'mdi-table-eye', href: '' },
            { text: 'Eliminar Evento', icon: 'mdi-delete-empty', href: '' },
        ],
        niveles: [],
        portadas: [],
        cruds: [
            ['Crear', 'mdi-plus-outline'],
            ['Ver', 'mdi-file-outline'],
            ['Actualizar', 'mdi-update'],
            ['Eliminar', 'mdi-delete'],
        ],

    }),

    methods: {

        activeDialogMulti(item) {

            if (item == 'subir') {
                this.activeMultimedia = true;
            }

        },

        getGrados(item) {
            var value = null;
            if (item.titulo == 'Básico' || item.titulo == 'Basico') value = item.Grados
            else value = item.Carreras
            return value
        },

        getGradoNombre(item, grado) {
            var orientacion = '';

            var value = null;
            if (item.titulo == 'Básico' || item.titulo == 'Basico') {
                value = grado.grado + grado.abr + " Básico"
            }
            else {
                if (grado.orientacion != 'Ninguna') orientacion = ' Con Orientación en ' + grado.orientacion;
                value = grado.carrera + orientacion
            }
            return value
        },

        getPortada(item) {
            console.log("Portada ", item);
            this.$router.push({ path: `/administrador/gestiones/portada/${item.id}` });
        },
        /* navegarNivel(item){ 
                 this.$router.push({ path: `/nivel=${item}/carreras` });
         },  */
        getcolor(item) {

            var color = null;
            if (item == 'Básico' || item == 'Basico') color = 'yellow'
            else color = 'warning'
            return color


        },

        navegarNivel(item) {

            var nivel = null

            if (item == 'Básico' || item == 'Basico') nivel = 'Basico'
            else nivel = item
            console.log("item nivel ", nivel)

        },

        getNiveles() {
            api.getAllNiveles().then((re) => {
                var data = re.data;
                for (let i in data) {
                    this.niveles.push(data[i]);
                }

                console.log("item nivel ", this.niveles)
            })
        },
        getPortadas() {
            api.getAllPortadas().then((re) => {
                var data = re.data;
                for (let i in data) {
                    data[i].id = i;
                    this.portadas.push(data[i]);
                }
            })
        }



    },

    created() {
        this.getNiveles();
        this.getPortadas();
    }
}
</script>
<style scoped>
.title-row {
    font-weight: bolder;
}

.bienvenida {
    padding: 10px;
    text-align: left;
    height: 50px;
    background: white;
}

.header {
    font-weight: bolder;
    font-size: 17pt;
}

.body-dashboard {
    background: white;
}

.contenedor {
    background: white;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
}
</style>