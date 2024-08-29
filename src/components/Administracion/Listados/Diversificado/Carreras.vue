<template>
    <v-container>
        <v-row>
            <v-col cols="6" md="4" v-for="(item, i) in carreras" :key="i">
                <v-card max-width="375" class="mx-auto">
                    <v-img :src="item.img" height="300px" dark>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>
<script >
import api from '@/models/controller'

export default {
    name: 'Basico',

    components: {

    },

    data: () => ({
        carreras: [/*{ id: 1, title: 'Básico', grado: '1', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' },
        { id: 2, title: ' Básico', grado: '2', abr: 'do', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' },
    { id: 3, title: 'Básico', grado: '3', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis' }*/]

    }),
    methods: {
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
    },

    created() {
        this.getGrados();
    }
}
</script>