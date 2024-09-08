<template>
  <div class="text-center">
    <v-container>
      <p class="title-nivel mt-5">DIVERSIFICADO</p>
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
      <span style="font-size: 18pt; margin-top: -50px !important" class="mb-5"
        >Carreras</span
      >

          <v-container v-for="(item, i) in carreras" :key="i" class="mt-5">
            <v-row  v-if="i % 2"   style="margin:0px; background: rgb(255, 255, 255); border-radius: 10px">
              <v-col    :order="screenWidth >600 ? 'last' : 'first'" cols="12" md="6" class="px-3 py-0">
                <div class="outer-div">
                <div class="text-center">
                  <p class="title-carrera mt-md-3 mt-3">
                    {{ item.titulo }}
                    <br v-if="item.orientacion != ''" />
                    {{
                      item.orientacion != ''
                        ? "Con Orientacion " + item.orientacion
                        : ""
                    }}
                    <br />
                    <span style="color: gray">({{ item.anios }} años)</span>
                  </p>

                  <p class="text-justify">{{ item.descripcion }}</p>

                  <br />
                  <br />
                  <div style="width: 100%; text-align: center">
                    <v-btn outlined large 
                      @click="verGrado(item)"
                      dark rounded
                      color="#ffbb00"
                      style="width: 50%; border:solid 2px #ffbb00; font-weight: bolder;"
                      class="text-center mb-5"
                      >VER PENSUM</v-btn
                    >
                  </div>
                </div>
            </div>
              </v-col>
              <v-col cols="12" md="6" class="px-0 py-0">
                <v-img max-height="570px" :src="item.url" style="border-radius: 10px"></v-img>
              </v-col>
            </v-row>

            <v-row
              v-else
              
              style="background: rgb(255, 255, 255); border-radius: 10px"
            >

              <v-col cols="12" md="6" class="px-3 py-0"  :order="i%2 ?  'first' : 'last' ">
                <v-img
                  max-height="570px"
                  :src="item.url"
                  style="border-radius: 10px; object-fit: cover"
                ></v-img>
              </v-col>
              <v-col cols="12" md="6" class="px-3 py-0">
                <div class="outer-div">

                <div class="text-center">
                    <p
                  class="title-carrera title-center mt-md-3 mt-3"
                 
                >
                  {{ item.titulo }} <br v-if="item.orientacion != ''" />
                  {{
                    item.orientacion != ''
                      ? "Con Orientacion " + item.orientacion
                      : ""
                  }}
                  <br />
                  <span style="color: gray">({{ item.anios }} años)</span>
                </p>
                  <p class="text-justify">{{ item.descripcion }}</p>

                  <br />
                  <br />
                  <div style="width: 100%; text-align: center">
                    <v-btn outlined large 
                      @click="verGrado(item)"
                   
                      dark
                       style="width: 50%; border:solid 2px #ffbb00; font-weight: bolder;"
                      color="#ffbb00"
                     rounded
                      class="text-center mb-5"
                      >VER PENSUM</v-btn
                    >
                  </div>
                </div>
                </div>
              </v-col>
            </v-row>
          </v-container>

    </v-container>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  name: "Listado",

  components: {},

  data: () => ({
    screenWidth: window.innerWidth, // Ancho inicial de la pantalla
    
    carreras: [
      /*{ id: 1, carrera: 'Perito Contador', grado: '1', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis', img: 'https://www.intellectus.edu.gt/blog/wp-content/uploads/2023/06/estudiar-perito-contador-510x339.jpg' },
        { id: 2, carrera: 'Finanzas', grado: '2', abr: 'do', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis', img: 'https://blog.uch.edu.pe/wp-content/uploads/2023/01/carrera-de-contabilidad-y-finanzas-uch-universidad-750x500.jpg' },
        { id: 3, carrera: 'Bachiller en ciencias y letras en Computación', grado: '3', abr: 'ro', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, dignissimos ad! Harum recusandae beatae totam aspernatur ab neque enim error numquam ea. Maiores quia est obcaecati autem, expedita corrupti facilis', img: 'https://www.deguate.com/artman/uploads/38/bachillerato-computacion-gu.jpg' } */
    ],
  }),
  methods: {
    verGrado(item) {

      this.$router.push({ path: `/nivel=Diversificado/carrera=${item.id}` });
    },
    getCarrerasAll() {
      try {
        api.allCarreras().then((re) => {
          var data = re.data;
          this.carreras = data.result;

          this.carreras.sort(function (a, b) {
          return a.id - b.id;
        });
        });
      } catch (error) {
        alert(error);
      }
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  },
  mounted() {
    // Añadir un event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', this.updateScreenWidth);
  },
  beforeDestroy() {
    // Remover el event listener cuando el componente sea destruido
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  created() {
    this.getCarrerasAll();
  },
};
</script>

<style scoped>
.title-nivel {
  font-size: 6vh;
  margin-bottom: 0px;
  font-weight: bolder;
}

.grado {
  font-size: 12vh;
  font-weight: bolder;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.abreviatura {
  font-size: 7vh;
  margin-left: -15px;
}

.nivel {
  margin-top: -40px;
}

.title-carrera {
  font-weight: bolder;
  font-size: 4.5vh;
  line-height: 40px;
}

@media screen and (min-width: 550px) {
  .title-right {
    text-align: right !important;
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

.outer-div {
  display: flex;               /* Activa Flexbox */
  justify-content: center;     /* Centrado horizontal */
  align-items: center;         /* Centrado vertical */
  height: 100%;               /* Altura del contenedor externo */
       /* Borde para visualización */
}
</style>
