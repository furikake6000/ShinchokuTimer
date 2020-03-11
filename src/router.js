import Vue from 'vue';
import Router from 'vue-router';
import Landing from './components/Landing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    }
  ]
});
