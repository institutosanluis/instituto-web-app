<template>
  <div>
   <div class="titulo-pensum-1">
    <p style="text-align: center !important" class="titulo-carrera mt-8"> <span> PEMSUN CARRERA </span>

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
  </div> 
    <v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <p style="text-align: center !important" class="titulo-carrera">
              {{ carrera.titulo }}
              <span v-if="carrera.orientacion != ''">
                Con Orientación {{ carrera.orientacion }}</span
              >
            </p>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="12" md="6">
            <v-img height="450" :src="carrera.url" style="border-radius: 10px"></v-img>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
    
        <v-row v-if="grados.length != 0">
        <v-col cols="12" class="text-center">    <h1>GRADOS</h1> <p>CURSOS</p> </v-col>
          <v-col cols="12" md="4" v-for="(grado, i) in grados" :key="i">
            <v-card class="rounded-xl px-3" elevation="8" >
            <div class="cajon-grados" >
              <p class="titulo-grados">
                {{ grado.titulo }}
              </p>
              <div>
                <p style="font-weight: bolder">ÁREAS Y SUB-ÁREAS</p>
                <ul v-for="(area, i) in getCursos(grado.idcarrera, grado.id)" :key="i">
                  <li>{{ area.curso}}</li>
                </ul>
              </div>
            </div>
          </v-card>
          </v-col>
        </v-row>

        <h1 class="text-center mt-15" v-else> <v-icon size="50" color="red">mdi-minus-circle</v-icon>NO HAY DATOS PARA MOSTRAR</h1>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import api from "@/models/controller";
export default {
  name: "GradoHome",
  props: { id: null, idGrado: null },
  data: () => ({
    typePortada: "Principal",
    carrera: {},
    grados: [],
    cursos: [],
  }),

  methods: {
    getGrado(idgrado) {
      try {
        api.allCarreraId(idgrado).then((re) => {
          var data = re.data;
          this.carrera = data.result;
 

          if (this.carrera) {
            this.getGradosCarrera(this.carrera.id);
    
          }

        });
      } catch (error) {
        alert(error);
      }
    },
    getGradosCarrera(id) {
      api.allGradosCarreraId(id).then((re) => {
        var data = re.data;
        var array = data.result;
        if(array.length !=0 ){
          this.grados = data.result;
        this.listCursos(this.grados[0].idcarrera)
        }
      });
    },
    getlist(item) {
      var array = [];
      for (let i in item) {
        array.push(item[i]);
      }

      return array;
    },

    getCursos(carrera, grado) {
      var cursos = []
      for(let item in this.cursos){
        if(carrera == this.cursos[item].idcarrera && grado == this.cursos[item].idgrado  ){
          cursos.push(this.cursos[item])
        }
        
      }
      return cursos;
    },
    listCursos(carrera){
      var cursos = [];
        api.allCursosGrados(carrera).then((re) => {
          let data = re.data;
          this.cursos = data.result;
        });

        //  console.log("Cursos - grados ", this.cursos)
        return cursos;
    }
  },
  created() {
    if (this.id != null) {
      this.getGrado(this.idGrado);
    }
  },
};
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
  text-align: center;
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
  font-size: 3vh;
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
    text-align: left;
  }

  .titulo-carrera {
    font-weight: bolder;
    text-align: center;
    font-size: 4vh;
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
  margin-top: -10px !important;

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
}

.titulo-pensum-1 {
  padding-top: 1px;
  background: rgb(25, 163, 255);
  height: 100px;
  width: 100%;
}
</style>
