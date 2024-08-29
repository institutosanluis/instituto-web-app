
<template>
    <v-dialog max-width="600px" persistent v-model="value">
        <v-card>
            <v-toolbar color="#ffbb00" dark> Crear publicación <v-spacer> </v-spacer> <v-icon @click="cancelar()"> mdi-close-circle</v-icon></v-toolbar>

            <v-container>

                <div class="contenedor-multimedia">
                    <v-radio-group v-model="publicacion" row>
                        <v-radio label="Ahora" value="EventosPasados"></v-radio>
                        <v-radio label="Próximamente" value="EventosProximos"></v-radio>

                    </v-radio-group>
                    <v-item class="mt-0">
                        <v-text-field v-model="description" dense rounded label="¿De qué se trata?"></v-text-field>
                    </v-item>
                    <v-container>
                        <div v-if="multimedia.length < 1">
                            <v-img class="file-upload" src="../../../../assets/addMulti.jpg" height="200">
                                <p class="text-multimedia"> <v-icon size="40">mdi- mdi-plus-box-multiple</v-icon> <br>
                                    Agregar foto/video</p>
                                <input class="input-photo" type="file" ref="photo" value=""
                                    @change="uploadMultimedia($event)" />
                            </v-img>
                        </div>
                        <div v-else>
                            <v-btn color="white" class="text-none" depressed :loading="isSelecting" @click="onButtonClick">
                                <v-icon left>
                                    mdi-plus-box-multiple
                                </v-icon>
                                Agregar fotos/videos
                            </v-btn>
                            <input ref="uploader" class="d-none" type="file" @change="uploadMultimedia($event)">
                        </div>
                    </v-container>

                    <v-container v-if="multimedia.length > 0">
                        <v-row no-gutters>
                            <v-col v-for="(item, i ) in multimedia" cols="6" :key="i">
                                <v-img v-if="item.type == 'image'" :src="item.url" class="tamanio">
                                    <v-btn @click="deletePhoto(i, item)" class="mx-1 img-close" dark small icon color="red">
                                        <v-icon size="35" dark> mdi-close-circle </v-icon>
                                    </v-btn>
                                </v-img>
                                <div v-else style="position:relative" class="tamanio-cajon">
                                    <v-btn @click="deletePhoto(i, item)" class="mx-1 img-close-video" dark small icon
                                        color="red">
                                        <v-icon size="35" dark> mdi-close-circle </v-icon>
                                    </v-btn>
                                    <iframe v-bind:src="item.url" class="tamanio">

                                    </iframe>
                                </div>
                            </v-col>
                        </v-row>

                    </v-container>


                    <br>

                </div>

            </v-container>

            <v-card-actions>

                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-btn @click="agregar()" block :disabled="multimedia.length > 0 ? false : true" color="success"
                                class="mr-4">
                                Guardar
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn block color="error" class="mr-4" @click="cancelar()">
                                Cancelar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import updatePhoto from "@/controller/update";
import updateMulti from "@/controller/multimedia";
import fotos from '@/components/Administracion/Cargas/Carreras/CargaFotos'
import api from "@/models/controller";
export default {
    props: { value: null },
    data: () => ({
        dialog: true,
        column: null,
        publicacion: 'EventosPasados',
        multimedia: [],
        selectedFile: null,
        isSelecting: false,
        description: null
    }),
    methods: {

        cancelar() {
            this.value = false;
            this.descripcion = null;
            this.publicacion = 'EventosPasados'
            if (this.multimedia.length > 0) {
                this.eliminarCancelado()
            }
        },

        eliminarCancelado() {
            for (let i in this.multimedia) {
                let data = {
                    id: this.multimedia[i].id,
                    categoria: this.publicacion,
                };
                api.deletePhoto(data);
            }
        },
        agregar() {
            let fecha = new Date();
            let data = {
                evento:
                {
                    id: 'key',
                    publicacion: this.publicacion,
                    fecha: fecha.toLocaleDateString(),
                    descripcion: this.description,
                    galeria: this.multimedia
                }
            }
            api.addEventosActividades(data).then((re) => {
                this.multimedia = [];
                setTimeout(() => {
                    this.cancelar();
                }, 1000)

            })
        },
        onButtonClick() {
            this.isSelecting = true
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })

            this.$refs.uploader.click()
        },
        uploadMultimedia: function (e) {
            try {
                //const { files } =  e.target.files[0]//this.$refs.photo;
                const file = e.target.files[0] //files[0];
                console.log(e.target)
                updateMulti(file, 'EventoMultimedia').then((result) => {
                    var dataimg = result;

                    this.multimedia.push({
                        url: dataimg.url,
                        id: dataimg.id,
                        type: file.type == 'video/mp4' ? 'video' : 'image'
                    });
                    console.log("Datos multimedia ", this.multimedia)
                });
                //this.cargarImagen(file, i);
                console.log(file)
                e.currentTarget.files = null;
            } catch (error) {
                console.log("Error ", error);
            }
        },

        deletePhoto: function (index, item) {
            let data = {
                id: item.id,
                categoria: 'EventoMultimedia',
            };

            console.log("dfd ", data)

            api.deletePhoto(data).then(() => {
                this.multimedia.splice(index, 1);
                // this.enviarFotos(this.photos);
            });
        },

    },

    watch: {
    },
    created() {

    },
};
</script >
<style scoped>
.contenedor-multimedia {
    padding: 15px;
    background: white;
    width: 300px;
    margin: 0px auto;
    text-align: center
}



.img-input {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-photo {
    width: 70px;
    height: 90px;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
}

.text-multimedia {
    position: absolute;
    top: 30%;
    left: 23%;
    font-weight: bolder;
}

.file-upload {
    text-align: center;

    position: relative;
    border: solid gray 1px;
    border-radius: 8px;
    width: 100%;
    /*border: 1px solid #01e934;*/
    /*border-radius: 100px;*/
    overflow: hidden;
    position: relative;
}

.file-upload input {

    position: absolute;
    height: 400px;
    width: 400px;
    left: -200px;
    top: -200px;
    background: transparent;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
}

.file-upload img {
    height: 200px;
    width: 200px;
    margin: 10px;
    border-radius: 8px;
    color: rgb(241, 241, 6);
}

.img-close {
    position: absolute;
    top: 3px;
    right: 1px;
    height: 40px !important;

    z-index: 3;
    border-radius: 40%;
}

.img-close-video {
    position: absolute;
    top: 3px;
    right: 1px;
    height: 40px !important;

    z-index: 3;
    border-radius: 40%;
}

.tamanio-cajon {
    height: 150px;
    width: 150px;
}

.tamanio {
    object-fit: cover;
    height: 100px;
    width: 150px;
    position: relative;
}


@media screen and (min-width: 550px) {

    .contenedor-multimedia {
        padding: 15px;
        background: white;
        width: 400px;
        margin: 0px auto;
    }

    .text-multimedia {
        position: absolute;
        top: 30%;
        left: 29%;
        font-weight: bolder;
    }

}
</style>