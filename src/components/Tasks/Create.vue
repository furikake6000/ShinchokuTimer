<template>
  <div id="tasksCreate">
    <h1>やること登録</h1>

    <form>
      <div class="task-create-form">
        <div class="text-align-left">
          <p><span class="text-large">私は、</span>帰ったら</p>
          <input type="text" name="name" v-model="name" placeholder="絵を描く / 筋トレ etc...">
          <p>に</p>
          <select name="period" v-model="period">
            <option value="60">1分間</option>
            <option value="300">5分間</option>
            <option value="600">10分間</option>
            <option value="900">15分間</option>
            <option value="1800">30分間</option>
            <option value="3600">1時間</option>
            <option value="5400">1時間30分</option>
            <option value="7200">2時間</option>
            <option value="10800">3時間</option>
          </select>
          <p>取り組みます。</p>
        </div>
      </div>

      <a class="blockbtn btn-primary">
        <p class="text-large">今すぐやる</p>
        <p class="text-desc">ここをタップしてタイマーを起動</p>
      </a>
      <a @click="postTaskAndGotoTop()" class="blockbtn btn-primary">
        <p class="text-large">帰ったらやる</p>
        <p class="text-desc">ここをタップして予定を登録</p>
      </a>
      <router-link to="/" class="blockbtn">
        <p class="text-medium">戻る</p>
      </router-link>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TasksCreate',
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user || {};
    });
  },
  data() {
    return {
      user: {},
      name: '',
      period: 1800
    };
  },
  methods: {
    postTaskAndGotoTop() {
      this.postTask();
      this.$router.push('/');
    },
    postTask() {
      if(this.name.length){
        firebase.database().ref(`users/${this.user.uid}/tasks`).push({
          name: this.name,
          period: this.period,
          createdAt: Date.now()
        });
      }
    }
  }
};
</script>

<style scoped lang='sass'>
.task-create-form
  margin: 4rem 1rem 6rem 1rem
  font-weight: bold
  font-size: 1.5rem
  p
    margin: 0
    line-height: 100%
  input[type="text"]
    width: calc(100% - 6px)
    text-indent: 0.8rem
    padding:
      top: 0.8rem
      bottom: 0.8rem
    margin:
      top: 1rem
      bottom: 1rem
    font-weight: bold
    font-size: 1.5rem
    background-color: #F0F0F0
    border: 3px solid black
    &::placeholder
      color: #979797
  select
    width: 80%
    padding: 0.8rem
    margin:
      top: 1rem
      bottom: 1rem
    font-weight: bold
    font-size: 1.5rem
    background-color: #F0F0F0
    border: 3px solid black
    border-radius: 10px

</style>
