import Vue from 'vue';
import Router from 'vue-router';
import Top from './components/Top.vue';
import TasksCreate from './components/Tasks/Create.vue';
import TasksIndex from './components/Tasks/Index.vue';

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
      path: '/tasks/create',
      name: 'tasksCreate',
      component: TasksCreate
    },
    {
      path: '/tasks',
      name: 'tasksIndex',
      component: TasksIndex
    }
  ]
});
