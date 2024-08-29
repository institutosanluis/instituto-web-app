import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import  firebase from 'firebase/app'
import router from './router'
import vuetify from './plugins/vuetify'


firebase.initializeApp({ 
  apiKey: "AIzaSyCwDm2FzhXQcy1o33QRKgyEhTu_7o9HyC0",
  authDomain: "instituto-sanluis.firebaseapp.com",
  projectId: "instituto-sanluis",
  storageBucket: "instituto-sanluis.appspot.com",
  messagingSenderId: "894992787821",
  appId: "1:894992787821:web:81cfbddf489706c2f7d264",
  measurementId: "G-TJ134K3FFX"
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
