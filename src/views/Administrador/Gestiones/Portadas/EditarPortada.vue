

<template>
    <v-container>
        <div class="container form-add">

            <v-form class="px-5 py-5" style="background:white; margin:0 auto" ref="form" v-model="valid" lazy-validation>
                <v-btn icon @click="$router.go(-1)" > <v-icon size="35">mdi-arrow-left-circle</v-icon></v-btn>
               
                <p style="font-weight:bolder; font-size:18pt; text-align:center">PORTADA</p>
                <p style=" font-size:16pt; text-align:center">{{ this.$route.params.id }}</p>
                <v-row>

                    <v-col cols="12">
                        <v-label>Título<span style="color:red">*</span> </v-label>
                        <v-text-field placeholder="Ingrese titulo*" single-line outlined v-model="titulo" :rules="nameRules"
                            required></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                        <v-label>Vista Previa</v-label>
                        <div style="height:250px">
                            <v-img style=" height:100%" alt="Portada" :src=" viewPrev">

                            </v-img>
                           
                        </div>
                        <br>
                    </v-col>
                </v-row>


                <p style="font-weight:bolder; font-size:16pt;">Cargar Nueva Imagen</p>
                <fotos v-on:photos="onPhotos" :listaphotos="[]" :categoria="'Basico'"></fotos>


                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-btn block :disabled="!valid" color="success" class="mr-4" @click="validate">
                                Guardar
                            </v-btn>
                        </v-col>
                        <!--<v-col cols="6">
                            <v-btn block color="error" class="mr-4" @click="reset">
                                Cancelar
                            </v-btn>
                        </v-col>-->
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
        titulo: null,
        viewPrev: null,
        portada: {},
        nameRules: [
            v => !!v || 'Campo requerido'
        ],

        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),

    methods: {
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
            let data = {
                id: this.$route.params.id,
                titulo: this.titulo,
                idimg: this.arrayImg[0].id,
                url: this.arrayImg[0].img
            }

            api.addPortada(data).then((re) => {
                this.getPortadId(this.$route.params.id)
                console.log(re);
                this.reset();
                this.arrayImg = [];
            })
        },

        getPortadId(id){
            id=this.$route.params.id;
                api.getPortadasId(this.$route.params.id).then((re)=>{
                    var data = re.data;
                    this.portada= data;
                    this.titulo= data.titulo;
                    this. viewPrev= data.url
                    console.log("TRAE LA DATA DE LA PROTADA : ", re.data)
                })
        }
    },

    created(){
        this. getPortadId(this.$route.params.id);
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