<template>
<div>
<v-container>

<br>
    <p class="title-equipo">VISITANOS</p>
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
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.988801166086!2d-91.64283462591963!3d14.599713777100426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858eedac6f7818ad%3A0xd270b0999a216154!2sInstituto%20B%C3%A1sico%20por%20cooperativa%20San%20Luis!5e0!3m2!1ses!2sgt!4v1715925129414!5m2!1ses!2sgt" width="100%" height="550" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

</v-container>
</div>

</template>

<style scoped>
.title-equipo {
    font-size: 20pt;
    font-weight: bolder;
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


@media screen and (min-width: 550px) {

.title-equipo {
    font-size: 6vh;
    font-weight: bolder;
}
}
</style>