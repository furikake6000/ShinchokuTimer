import Vue from 'vue';
import Router from 'vue-router';
import Top from './components/Top.vue';
import TaskEdit from './components/Task/Create.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/task/create',
      name: 'taskCreate',
      component: TaskEdit
    }
  ]
});
