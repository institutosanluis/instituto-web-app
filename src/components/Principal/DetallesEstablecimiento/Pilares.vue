<template>
    <div>
  
      <p class="quienes-somos mb-5">NUESTROS PILARES</p>
      <v-row>
        <v-col cols="6" md="4" class="text-justify" v-for="(n, i) in pilares" :key="i">
            <v-img src="../../../assets/img/fondo.png" class="pilares-card">
                <p class="pilares">{{ n }}</p>
            </v-img>

            <!--<v-card style="height:175px; border-radius:10px" class="text-center py-5 pilares-card" elevation="5">
                <p class="pilares">{{ n }}</p>
            </v-card>-->
 
        </v-col>
      </v-row>
    </div>
  </template>
    
  <script >

  
  export default {
    name: 'Listado',
  
    components: {
    },

    data: () => ({
     pilares: ['RESPETO','DEDICACIÓN', 'EXCELENCIA', 'PROFESIONALISMO', 'ESPIRITUALIDAD', 'RESPONSABILIDAD']
    }),
  }
  </script>
  
  <style scoped>
  .contenido-informacion {
  
    border-radius: 10px;
    text-align: center;
    color: white;
    font-weight: bolder;
  }
  
  div.noticia {
    margin: 20px auto;
    color: #1f1f1f;
  
  }
  
  div.noticia img.izquierda {
    float: left;
    margin-right: 15px;
    height: 100%
  }
  
  div.noticia img.derecha {
    float: right;
    margin-left: 15px;
  }
  
  div.reset {
    clear: both;
  }
  
  .title {
    font-size: 14pt;
    font-weight: bolder;
    margin-bottom: -3px
  }
  
  .quienes-somos {
    font-size: 4vh;
    font-weight: bolder
  }

  .pilares{
    font-size:14pt;
    font-weight: 700;
  }


  .pilares-card {
    position: relative;
}



.pilares-card .pilares {
    text-align: center;
    position: absolute;
    font-weight: bolder;
    top: 45%;
    left: 50%;
    color:white;
    transform: translate(-50%, -50%);
    font-size: 2vh;
    line-height: 30px;
}

@media screen and (min-width: 550px) {


.pilares {

font-size: 4vh !important;
line-height: 65px !important;

}}
  </style>