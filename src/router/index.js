import Vue from 'vue'
import VueRouter from 'vue-router'
import PrincipalView from '../views/Principal.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PrincipalView
  },
  {
    path: '/admisiones',
    name: 'Adminisones',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MenuLateral/Admisiones.vue')
  },
  {
    path: '/eventos',
    name: 'Noticias',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MenuLateral/Noticias.vue')
  },
  {
    path: '/niveles',
    name: 'Niveles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MenuLateral/Niveles.vue')
  },
  {
    path: '/contacto',
    name: 'Contacto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/MenuLateral/Contacto.vue')
  },
  {
    path: '/nivel=:tipo/carreras',
    name: 'NivelesCarreras',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Niveles/Diversificado/Principal.vue')
  },

  {
    path: '/nivel=:tipo/carrera=:carrera',
    name: 'Grado',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Niveles/Grados.vue')
  },

  {
    path: '/administrador/cargas/carreras',
    name: 'Agregar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Administrador/Cargas/Carreras/Agregar.vue')
  },


  {
    path: '/cargarmultimedia',
    name: 'Multimedia',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Administracion/Cargas/Multimedia/Archivo.vue')
  },
  {
    path: '/administrador/carga/caracteristica',
    name: 'AgregarEventos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Administrador/Cargas/ContamosCon/Caracteristicas.vue')
  },
  {
    path: '/administrador/cargar/carreragrado/:id/:titulo',
    name: 'Carreras',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Administrador/Cargas/Carreras/AgregarGrado.vue')
  },

  {
    path: '/administrador/cargas/basico',
    name: 'AgregarBasico',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Administrador/Cargas/Basico/Agregar.vue')
  },

  {
    path: '/administrador/listado/carreras',
    name: 'CarrerasListado',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Administrador/Listados/Diversificado/Carreras.vue')
  }
]

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
},
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
