<template>
  <div id="tasksResult">
    <h1>予定完了</h1>
    <div class="result">
      <p class="name text-large">{{ task.name }}</p>
      <p class="text-medium">目標時間<span class="time text-xlarge">{{ secondsToStr(task.period) }}</span></p>
      <p class="text-medium">達成時間<span class="time text-xlarge">{{ secondsToStr(elapsedTime) }}</span></p>
    </div>
    <textarea name="comment" rows="4" v-model="comment" placeholder="コメント" />
    <a @click="finishTask()" class="blockbtn btn-primary">
      <p class="text-large">記録する</p>
      <p class="text-desc">記録してトップページに戻ります</p>
    </a>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TasksResult',
  props: {
    task: Object,
    elapsedTime: Number
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user || {};
    });
  },
  data() {
    return {
      comment: ''
    };
  },
  methods: {
    finishTask() {
      firebase.database().ref(`users/${this.user.uid}/tasks/${this.$route.params.id}`).remove();
      firebase.database().ref(`users/${this.user.uid}/finishedTasks`).push({
        task: this.task,
        elapsedTime: this.elapsedTime,
        finishedAt: Date.now(),
        comment: this.comment
      });
      this.$router.push('/');
    },
    secondsToStr(seconds) {
      return (seconds >= 3600 ? `${parseInt(seconds / 3600)}:` : '') + 
             `${('00' + parseInt(seconds / 60) % 60).slice(-2)}:${('00' + parseInt(seconds % 60)).slice(-2)}`;
    }
  }
};
</script>

<style scoped lang='sass'>
#tasksResult
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 10%
  color: #137717
  display: flex
  flex-direction: column

  .result
    flex: 1
    p
      margin: 0
      line-height: 180%
    .time
      margin-left: 4rem
    .name
      margin: 3rem 0

  textarea
    padding: 0.8rem
    margin: 1rem 1.5rem
    font-weight: bold
    font-size: 1.5rem
    background-color: #F0F0F0
    border: 3px solid black
    &::placeholder
      color: #979797

</style>
