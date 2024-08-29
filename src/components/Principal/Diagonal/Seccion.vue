<template>
<div>
    <div class="wrapper">
  <!--<section>
    <h1>Esta es una sección</h1>
  </section> -->
  <section>
    <div class="section-content has-diagonal">
      <h1>Esta es una sección en diagonal</h1>
      <p>Es muy chida y además es responsiva...</p>
    </div>
    <div class="section-mask"></div>
  </section>
  <!--
  <section>
    <div class="section-content has-padding">
      <h1>Esta es una sección normal</h1>
    <p>Podemos notar que el contenido puede tener una altura automática.</p>
      <p>Con una altura automática podemos tener un contenido dinámico que no rompa el estilo del diseño<br>sin importar el dispositivo con el que se acceda al sitio.</p>
    </div>
  </section>
  <section>
    <div class="section-content has-diagonal">
      <h1>Esta es una sección en diagonal y con parallax</h1>
    </div>
    <div class="section-mask bg-option-2 has-parallax"></div>
  </section>
    <section>
    <div class="section-content has-padding">
      <h1>Gracias</h1>
    </div>
  </section> -->
</div>

</div>
</template>

<style scoped>

section {
  min-height: 450px;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  text-align: center;
  
  .has-diagonal {
    
  }
  
  .section-content {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  
  .section-mask {
    position: absolute;
    top: -50px;
    bottom: -50px;
    right: 0;
    left: 0;
    z-index: 1;
    background: url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
    background-size: cover !important;
    transform: skewY(10deg);
  }
  
}

.has-parallax {
  background-attachment: fixed !important;
}


/*Estilos para la presentación IGNORAR*/

body {
  padding: 0;
  margin: 0;
  font-family: proxima nova, arial, sans-serif;
}

h1 {
  width: 100%;
  font-size: 36px;
}
p {
  font-size: 18px;
  width: 100%;
  display: block;
}

.has-diagonal {
  p,h1 { 
    color: #fff 
  }
}

.has-padding {
  padding-top: 250px !important;
  padding-bottom: 250px !important;
}

.bg-option-2 {
  background: url(https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1362&q=80) !important;
  background-attachment: fixed !important;
}
</style>