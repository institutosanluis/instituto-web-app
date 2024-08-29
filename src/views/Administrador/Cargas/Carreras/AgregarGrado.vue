<template>
    <v-container>
        <div class="container form-add">

            <v-form class="px-5 py-5" style="background:white; margin:0 auto" ref="form" v-model="valid" lazy-validation>
                    <v-btn @click="$router.go(-1)" icon> <v-icon size="40">mdi-keyboard-backspace</v-icon></v-btn>
                <p style="font-weight:bolder; font-size:16pt; text-align:center">{{ this.$route.params.titulo }}</p>

                <br>

                <v-row>
                    <v-col cols="6">
                        <v-label>Grado:<span style="color:red">*</span> </v-label>

                        <v-text-field type="number" placeholder="Grado*" single-line outlined v-model="grado"
                            :rules="nameRules" required></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-label>Duración:</v-label>
                        <v-text-field type="number" placeholder="Años" single-line outlined v-model="anios"
                            required></v-text-field>
                    </v-col>
                </v-row>

                <p style="font-weight:bolder; font-size:14pt; ">ÁREAS y SUB-AREAS</p>
                <v-row no-gutters>
                    <v-col cols="8">
                        <v-label>Nombre del área:<span style="color:red">*</span> <span style="color:red"
                                v-if="errorStatus == true">{{ error }}</span></v-label>
                        <v-text-field type="text" placeholder="Ingrese área*" single-line outlined v-model="area"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="4" class="pl-3 pr-5" align-self="center">
                        <v-btn @click="agregarAreas()" dark color="green" block>Agregar</v-btn>
                    </v-col>
                </v-row>
                <v-chip-group column>
                    <v-chip outlined v-for="(item, i) in areas" :key="i" style="position:relative" @click="eliminarArea(i)">
                        {{ item.area }}
                        <v-icon color="red">mdi-close</v-icon>
                    </v-chip>
                </v-chip-group>
                <br v-if="areas.length > 0">

                <!--<p style="font-weight:bolder; font-size:16pt;">Cargar Imagen</p>
                <fotos v-on:photos="onPhotos" :listaphotos="[]" :categoria="'Carreras'"></fotos>-->


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
        error: 'Vacio',
        errorStatus: false,
        arrayImg: [],
        valid: true,
        grado: null,
        area: '',
        areas: [],
        nombre: 'Diversificado',
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

        eliminarArea(item) {
            this.areas.splice(item, 1);
            this.areas = this.areas;
        },
        agregarAreas() {
            if (this.area != '') {
                this.errorStatus = false;
                this.areas.push({
                    area: this.area
                })
                this.area = '';
            } else {
                this.errorStatus = true;
            }

        },
        validate() {
            if (this.$refs.form.validate()) {
                this.agregar();
            }
        },
        reset() {
            this.$refs.form.reset();
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
                id: this.$route.params.id,
                grado:
                {
                    abr: abre,
                    grado: this.grado,
                    areas: this.areas,
                    nivel: 'Grado',
                    anios: this.anios
                }
            }

            api.addCarreraGrado(data).then((re) => {
                this.reset();
                this.area = '';
                this.areas = [];
            })
        }
    },

    created() {
    }
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