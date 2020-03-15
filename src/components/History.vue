<template>
  <div id="history">
    <h1>過去の記録</h1>
    <div class="task-histories">
      <template v-if="Object.keys(taskHistories).length">
        <template v-for="taskHistory in taskHistories">
          <div class="task-history" :key="taskHistory.task.createdAt" :class="{ incomplete : taskHistory.elapsedTime < taskHistory.task.period }">
            <div class="text-large">{{ taskHistory.task.name }}</div>
            <div>
              <div class="time text-medium">作業時間 <span class="text-large">{{ secondsToStr(taskHistory.elapsedTime) }}</span></div>
              <div class="time text-medium">目標時間 {{ secondsToStr(taskHistory.task.period) }}</div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <p>まだ完了したタスクはありません。</p>
        <router-link to="/taskHistories/create" v-if="Object.keys(taskHistories).length == 0" class="blockbtn btn-primary">
          <p class="text-large">やること登録</p>
        </router-link>
      </template>
    </div>
    <router-link to="/" class="blockbtn">
      <p class="text-medium">戻る</p>
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'History',
  created() {
    let _this = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user || {};
      }
    });
    this.taskHistoriesRef = firebase.database().ref(`users/${this.$route.params.id}/finishedTasks`);
    this.taskHistoriesRef.on('value', function(taskHistories) {
      _this.taskHistories = taskHistories.val();
    });
  },
  data() {
    return {
      taskHistories: {}
    };
  },
  methods: {
    secondsToStr(seconds) {
      return (seconds >= 3600 ? `${parseInt(seconds / 3600)}:` : '') + 
             `${('00' + parseInt(seconds / 60) % 60).slice(-2)}:${('00' + parseInt(seconds % 60)).slice(-2)}`;
    }
  }
};
</script>

<style scoped lang='sass'>
#history
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 10%
  display: flex
  flex-direction: column

// タスク一覧
.task-histories
  flex: 1
  margin:
    top: 2rem
    bottom: 2rem

// タスク一つ一つ
.task-history
  display: flex
  color: white
  background-color: #4CC72A
  margin-top: 1rem
  padding: 1.5rem 1rem
  text-decoration: none
  text-align: left
  justify-content: space-between
  .time
    text-align: right
    line-height: 130%
  &.incomplete
    background-color: #E74747
</style>
