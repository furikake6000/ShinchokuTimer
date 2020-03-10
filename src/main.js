import Vue from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import firebase from 'firebase';
 
Vue.component('font-awesome-icon', FontAwesomeIcon);
 
Vue.config.productionTip = false;

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyCjUkGDo36qFGBnxtnS7NG-BZmrdHvMl7o',
  authDomain: 'shinchoku-timer.firebaseapp.com',
  databaseURL: 'https://shinchoku-timer.firebaseio.com',
  projectId: 'shinchoku-timer',
  storageBucket: 'shinchoku-timer.appspot.com',
  messagingSenderId: '923765114537',
  appId: '1:923765114537:web:1cd414c70b24dcb8e34bb8',
  measurementId: 'G-67K8JCZC3J'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App),
}).$mount('#app');
