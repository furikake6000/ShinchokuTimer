<template>
  <div id="timer">
    <div class="bar" :style="`clip-path: inset(0 ${timeNormalized * 100}% 0 0)`">
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
        this.timerObj = setInterval(function() {this.update()}.bind(this), 100);
      },

      stop: function() {
        if (!this.timerObj) return;

        this.remainTime = this.timerEndDate.diff(this.nowDate);
        clearInterval(this.timerObj);
        this.timerObj = null;
      },

      initialize: function(limit) {
        this.stop();
        this.remainTime = (limit || this.defaultLimit); // milliseconds
        this.defaultLimit = this.remainTime;
      },

      setMinute: function(minutes) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('day', moment(0).get('day'));
        currentCount.set('hour', moment(0).get('hour'));
        currentCount.set('minute', Math.min(parseInt(minutes,10), 999));
        this.initialize(currentCount.valueOf());
      },

      setSecond: function(seconds) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('second', parseInt(seconds, 10));
        this.initialize(currentCount.valueOf());
      }
    },
    computed: {
      time: function() {
        if (this.timerObj){
          if (this.nowDate.isAfter(this.timerEndDate)) {
            return 0;
          }
          return this.timerEndDate.diff(this.nowDate);
        }else{
          return Math.max(this.remainTime, 0);
        }
      },
      timeStr: function() {
        return this.timerMinuteStr + ':' + this.timerSecondStr;
      },
      timerMinuteStr: function() {
        return Math.floor(moment(this.time).valueOf() / 60000);
      },
      timerSecondStr: function() {
        return ('00' + moment(this.time).second()).slice(-2);
      },
      timeNormalized: function() {
        return this.time / this.defaultLimit;
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='sass'>
  #timer
    display: flex
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
      position: absolute
      z-index: 10
      background-color: #137717
      left: 0
      width: 100%
      height: 100%
      .name, .time
        color: white
</style>
