<template>
  <div id="timer">
    <div class="display">
      <div class="bar" :class="{ finished : timerFinished }" :style="`clip-path: inset(0 ${timeNormalized * 100}% 0 0)`">
        <div class="name">{{ task.name }}</div>
        <div class="time">
          <span>{{ timerMinuteStr }}:{{ timerSecondStr }}</span>
        </div>
      </div>
      <div class="name">{{ task.name }}</div>
      <div class="time">
        <span>{{ timerMinuteStr }}:{{ timerSecondStr }}</span>
      </div>
    </div>
    <a @click="start()" class="blockbtn btn-primary" v-if="!timerObj">
      <p class="text-large">はじめる</p>
      <p class="text-desc">ここをタップしてタイマーを起動</p>
    </a>
    <template v-else>
      <a @click="stop()" class="blockbtn btn-primary" v-if="timerFinished">
        <p class="text-large">おわる</p>
        <p class="text-desc">記録する</p>
      </a>
      <a @click="stop()" class="blockbtn btn-danger" v-else>
        <p class="text-large">おわる</p>
        <p class="text-desc">まだ目標を達成していないが記録する</p>
      </a>
    </template>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Timer',
    props: {
      task: Object
    },
    data() {
      return {
        nowDate: moment(),
        timerEndDate: moment(),
        timerObj: null,
        remainTime: null,
        defaultLimit: null,
      };
    },
    watch: {
      task: function(task) {
        this.initialize(task.period * 60 * 1000);
      }
    },
    updated: function() {
      document.title = `${this.timeStr} - ${this.task.name}`;
    },
    methods: {
      update: function() {
        this.nowDate = moment();
      },
      start: function() {
        if (this.timerObj) return;

        this.nowDate = moment();
        this.timerEndDate = moment().add(this.remainTime);
        this.timerObj = setInterval(function() {this.update();}.bind(this), 100);
        this.$parent.isTimerRunning = true;
      },
      stop: function() {
        if (!this.timerObj) return;

        this.remainTime = this.time;
        clearInterval(this.timerObj);
        this.timerObj = null;
        this.$parent.isTimerRunning = false;
      },
      initialize: function(limit) {
        this.stop();
        this.remainTime = (limit || this.defaultLimit); // milliseconds
        this.defaultLimit = this.remainTime;
      },
      deleteTask: function() {

      }
    },
    computed: {
      time: function() {
        if (this.timerObj){
          return this.timerEndDate.diff(this.nowDate);
        }else{
          return this.remainTime;
        }
      },
      timeStr: function() {
        return this.timerMinuteStr + ':' + this.timerSecondStr;
      },
      timerMinuteStr: function() {
        return (this.time >= 0 ? '' : '-') + Math.floor(moment(Math.abs(this.time)).valueOf() / 60000);
      },
      timerSecondStr: function() {
        return ('00' + moment(Math.abs(this.time)).second()).slice(-2);
      },
      timeNormalized: function() {
        return this.time / this.defaultLimit;
      },
      timerFinished: function() {
        return this.time < 0;
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='sass'>
  #timer
    display: flex
    flex-direction: column

    .display
      display: flex
      position: relative
      flex: 1
      flex-direction: column
      justify-content: center
      background-color: #C2EFB5
      color: #137717

      .name
        font-size: 2.25rem
        font-weight: bold

      .time
        font-size: 6rem
        font-weight: bold
        span
          position: relative

      .bar
        display: flex
        flex-direction: column
        justify-content: center
        position: absolute
        z-index: 10
        background-color: #137717
        left: 0
        width: 100%
        height: 100%

        &.finished
          background-color: #E74747

        .name, .time
          color: white
</style>
