<template>
    <v-container>
        <div class="container form-add">

            <v-form class="px-5 py-5" style="background:white; margin:0 auto" ref="form" v-model="valid" lazy-validation>
                <v-btn @click="$router.go(-1)" icon> <v-icon size="40">mdi-keyboard-backspace</v-icon></v-btn>
                <p style="font-weight:bolder; font-size:16pt; text-align:center">{{ this.$route.params.titulo }}</p>

                <br>

                <p style="font-weight:bolder; font-size:14pt; "> REQUISITOS DE INSCRIPCIÓN</p>
                <v-chip-group v-model="nivel" column>
                    <v-chip filter outlined>
                        Básico
                    </v-chip>
                    <v-chip filter outlined>
                        Diversificado
                    </v-chip>
                </v-chip-group>
                <v-row no-gutters>
                    <v-col cols="8">
                        <v-label>Requisito:<span style="color:red">*</span> <span style="color:red"
                                v-if="errorStatus == true">{{ error }}</span></v-label>
                        <v-text-field type="text" placeholder="Ingrese requisito*" single-line outlined v-model="requisito"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="4" class="pl-3 pr-5" align-self="center">
                        <v-btn @click="agregarRequisitos" dark color="green" block>Agregar</v-btn>
                    </v-col>
                </v-row>
                <v-chip-group column>
                    <v-chip outlined v-for="(item, i) in requisitos" :key="i" style="position:relative"
                        @click=" eliminarRequisito(i)">
                        {{ item.requisito }}
                        <v-icon color="red">mdi-close</v-icon>
                    </v-chip>
                </v-chip-group>
                <br v-if="requisitos.length > 0">

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
        nivel: 0,
        area: '',
        requisito: '',
        areas: [],
        requisitos: [],
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

        eliminarRequisito(item) {
            this.requisitos.splice(item, 1);
            this.requisitos = this.requisitos;
        },
        agregarRequisitos() {
            if (this.requisito != '') {
                this.errorStatus = false;
                this.requisitos.push({
                    requisito: this.requisito
                })
                this.requisito = '';
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
            var nivel = null;

            if (this.nivel == 1) {
                nivel = 'Diversificado'
            } else {
                nivel = 'Básico'
            }
            let data = {
                id: this.nivel,
                nivel: nivel,
                requisitos: this.requisitos
            }

            api.addRequisitos(data).then((re) => {
                this.reset();
                this.requisito = '';
                this.requisitos = [];
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