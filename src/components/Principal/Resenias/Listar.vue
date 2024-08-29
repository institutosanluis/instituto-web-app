<template>
  <div class="fondo-resenias px-3">
    <p class="title-resenias">RESEÑAS</p>
    <ul class="nav mb-5">
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

    <v-container>
      <v-btn color="success" class="mb-5" @click="dialog = true">Dejar Reseña</v-btn>
      <br />
      <v-slide-group v-model="slideGroup">
        <v-slide-item v-for="(item, i) in resenias" :key="i" class="mx-3 py-3">
          <v-card max-width="300">
            <v-rating
              :value="item.ranting"
              background-color="gray"
              color="yellow accent-4"
              dense
              size="30"
            ></v-rating>
            <v-card-text class="text-md-body-1 font-weight-bold font-italic">
              "{{ item.comentario }}"
            </v-card-text>
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize">{{
                    item.nombre
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.tipopersona }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
    <br />

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Dejanos una Reseña</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-rating
                  hover
                  v-model="vtRanting"
                  background-color="gray"
                  color="yellow accent-4"
                  dense
                  half-increments
                  size="50"
                ></v-rating>
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field
                  filled
                  outlined
                  label="Nombre*"
                  v-model="vtNombre"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <v-select
                  filled
                  outlined
                  :items="['Alumno', 'Padre de Familia', 'Ex-Alumno']"
                  v-model="vtTipopersona"
                  label="Tipo de Persona*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  filled
                  name="input-7-1"
                  label="Comentario"
                  rows="3"
                  row-height="25"
                  v-model="vtComentario"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> Cancelar </v-btn>
          <v-btn color="blue darken-1" text @click="agregar()"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/models/controller";

export default {
  data: () => ({
    slideGroup: 0,
    vtComentario: "",
    vtNombre: "",
    vtTipopersona: "",
    dialog: false,
    resenias: [],
    vtRanting: 5,
  }),

  methods: {
    getResenias() {
      api.getAllResenias().then((re) => {
        if (re.status == 200) {

          this.resenias = re.data;
        }
      });
    },

    agregar() {
      let fecha = new Date();
      if (this.vtComentario != "" && this.vtNombre != "") {
        let data = {
          id: "key",
          comentario: this.vtComentario,
          nombre: this.vtNombre,
          tipopersona: this.vtTipopersona,
          ranting: this.vtRanting,
          fecha: fecha,
        };

        api.addResenia(data).then((re) => {
          console.log(re);
          this.dialog = false;
          this.vtComentario = "";
          this.vtNombre = "";
          this.vtTipopersona = "";
          this.getResenias();
        });
      } else {
        console.log("Campos vacios");
      }
    },
  },

  created() {
    this.interval = setInterval(() => this.slideGroup++, 2000);

    this.getResenias();
  },
};
</script>

<style scoped>
.fondo-resenias {
  width: 100%;
  background: rgb(248, 248, 248);
}

.title-resenias {
  font-size: 20pt;
  font-weight: bolder;
}

.cajon-resenia {
  background: rgb(196, 196, 196);
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

.circle-contamos {
  background: #ffbb00;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-left: 5px;
  margin-right: 6px;
  display: flex;
  /*Convertimos al menú en flexbox*/
  justify-content: space-between;
  /*Con esto le indicamos que margine todos los items que se encuentra adentro hacia la derecha e izquierda*/
  align-items: center;
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

.container-x {
  display: flex;
  overflow-x: auto;
}

.container-x v-card {
  margin-right: 15px;
}

.container-x::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width: 550px) {
  .title-resenias {
    font-size: 6vh;
    font-weight: bolder;
  }
}
</style>
