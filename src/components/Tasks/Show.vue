<template>
  <div id="tasksShow">
    <div class="timer-area" v-if="!isResultEnabled">
      <Timer :task="task"/>
      <a @click="deleteTask()" class="blockbtn btn-danger" v-if="!isTimerRunning">
        <p class="text-medium">予定を削除</p>
      </a>
      <router-link to="/tasks" class="blockbtn">
        <p class="text-medium">戻る</p>
      </router-link>
    </div>
    <TasksResult v-else :task="task" :elapsedTime="elapsedTime" />
  </div>
</template>

<script>
import firebase from 'firebase';
import Timer from './Timer.vue';
import TasksResult from './Result.vue';

export default {
  name: 'TasksShow',
  components: {
    Timer,
    TasksResult
  },
  created() {
    let _this = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user || {};
        this.tasksRef = firebase.database().ref(`users/${this.user.uid}/tasks/${this.$route.params.id}`);
        this.tasksRef.on('value', function(task) {
          _this.task = task.val();
        });
      } else {
        this.$router.push('/');
      }
    });
  },
  data() {
    return {
      task: {},
      isTimerRunning: false,
      isResultEnabled: false,
      elapsedTime: 0
    };
  },
  methods: {
    minutesIntToStr(minutes) {
      minutes = parseInt(minutes);
      return (minutes >= 60 ? `${minutes / 60}時間` : '') + (minutes % 60 ? `${minutes % 60}分` : '');
    },
    deleteTask() {
      this.tasksRef.remove();
      this.$router.push('/tasks');
    }
  }
};
</script>

<style scoped lang='sass'>
.timer-area
  position: absolute
  top: 10%
  left: 0
  right: 0
  bottom: 10%
  display: flex
  flex-direction: column
  #timer
    flex: 1

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
