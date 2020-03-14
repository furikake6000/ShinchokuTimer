<template>
  <div id="tasksIndex">
    <h1>やること一覧</h1>
    <div class="tasks">
      <template v-if="Object.keys(tasks).length">
        <div class="task" v-for="task in tasks" :key="task.createdAt">
          <p class="text-large">{{ task.name }}</p>
          <p class="text-medium">{{ minutesIntToStr(task.period) }}</p>
        </div>
      </template>
      <template v-else>
        <p class="text-large">完了！</p>
        <p>未完のやることはありません。</p>
      </template>
    </div>
    
    <router-link to="/tasks/create" v-if="Object.keys(tasks).length == 0" class="blockbtn btn-primary">
      <p class="text-large">やること登録</p>
    </router-link>
    <router-link to="/" class="blockbtn">
      <p class="text-medium">戻る</p>
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TasksIndex',
  created() {
    let _this = this;
    firebase.auth().onAuthStateChanged(user => {
      this.user = user || {};
      this.tasksRef = firebase.database().ref(`users/${this.user.uid}/tasks`);
      this.tasksRef.on('value', function(tasks) {
        _this.tasks = tasks.val();
      });
    });
  },
  data() {
    return {
      tasks: {}
    };
  },
  methods: {
    minutesIntToStr(minutes) {
      minutes = parseInt(minutes);
      return (minutes >= 60 ? `${minutes / 60}時間` : '') + (minutes % 60 ? `${minutes % 60}分` : '');
    }
  }
};
</script>

<style scoped lang='sass'>
h1
  display: block
  color: #4CC729
  background-color: #C2EFB5
  margin: 0
  padding: 2.5rem 0 1rem 0

// タスク一覧
.tasks
  margin:
    top: 3rem
    bottom: 3rem

// タスク一つ一つ
.task
  display: block
  color: white
  background-color: #4CC72A
  margin: 1rem 0
  padding: 1.5rem 1rem
  text-decoration: none
  text-align: left
  cursor: pointer
  p
    margin: 0
    line-height: 100%
</style>
