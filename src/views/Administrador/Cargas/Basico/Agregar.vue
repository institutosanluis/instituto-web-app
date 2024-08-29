<template>
    <v-container>
        <div class="container form-add">

            <v-form class="px-5 py-5" style="background:white; margin:0 auto" ref="form" v-model="valid" lazy-validation>
                <p style="font-weight:bolder; font-size:16pt; text-align:center">DATOS DEL GRADO</p>


                <v-row>
                    <v-col cols="4">
                        <v-label>Grado<span style="color:red">*</span> </v-label>

                        <v-text-field type="number" placeholder="Ingrese Grado*" single-line outlined v-model="grado"
                            :rules="nameRules" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-label>Nivel<span style="color:red">*</span> </v-label>

                        <v-text-field placeholder="Ingrese nivel*" single-line outlined v-model="nombre" :rules="nameRules"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-label>Duración</v-label>
                        <v-text-field type="number" placeholder="Ingrese años*" single-line outlined v-model="anios"
                            required></v-text-field>
                    </v-col>


                </v-row>
                <v-label>Descripción</v-label>
                <v-textarea v-model="description" outlined name="input-7-4"
                    placeholder="Ingrese descripción..."></v-textarea>

                <p style="font-weight:bolder; font-size:16pt;">Cargar Imagen</p>
                <fotos v-on:photos="onPhotos" :listaphotos="[]" :categoria="'Basico'"></fotos>


                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-btn block :disabled="!valid" color="success" class="mr-4" @click="validate">
                                Guardar
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn block color="error" class="mr-4" @click="reset">
                                Cancelar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>



            </v-form>

        </div>
    </v-container>
</template>
<script>
import api from '@/models/controller'
import fotos from '@/components/Administracion/Cargas/Carreras/CargaFotos'

export default {
    name: 'Agregar',

    components: {
        fotos
    },
    data: () => ({
        arrayImg: [],
        valid: true,
        grado: null,
        nombre: 'Básico',
        orientacion: '',
        anios: null,
        description: '',
        nameRules: [
            v => !!v || 'Campo requerido'
        ],

        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,
    }),

    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.agregar();
            }
        },
        reset() {
            this.$refs.form.reset();
            this.nombre= 'Básico'
        },

        onPhotos: function (datos) {
            this.arrayImg = datos;
        },
        vars() {
            console.log(ingreso)
        },
        agregar() {
            let fecha = new Date();
            var abre = null;

            if (this.grado == 1 || this.grado == 3) {
                abre = 'ro'
            } else if (this.grado == 2) {
                abre = 'do'
            } else {
                abre = 'to'
            }
            let data = {
                grado:
                {
                    id: 'key',
                    abr: abre,
                    grado: this.grado,
                    nivel: this.nombre,
                    descripcion: this.description,
                    anios: this.anios,
                    img: this.arrayImg[0].img,
                    idimg: this.arrayImg[0].img
                }
            }

            api.addGrado(data).then((re) => {
                console.log(re);
                this.reset();
                this.arrayImg = [];
                this.nombre= 'Básico'
            })
        }
    },
}
</script>

<style scoped>
.form-add {
    padding-left: 2px;
    padding-right: 2px
}

@media screen and (min-width: 550px) {
    .form-add {
        padding-left: 28%;
        padding-right: 28%
    }

}
</style>