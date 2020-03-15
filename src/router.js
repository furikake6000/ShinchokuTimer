import Vue from 'vue';
import Router from 'vue-router';
import Top from './components/Top.vue';
import TasksCreate from './components/Tasks/Create.vue';
import TasksIndex from './components/Tasks/Index.vue';
import TasksShow from './components/Tasks/Show.vue';
import History from './components/History.vue';

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
    },
    {
      path: '/tasks/:id',
      name: 'tasksShow',
      component: TasksShow
    },
    {
      path: '/users/:id/history',
      name: 'history',
      component: History
    }
  ]
});
