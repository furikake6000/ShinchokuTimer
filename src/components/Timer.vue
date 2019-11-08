<template>
  <div id="timer">
    <div id="display">
      <div class="bar" v-bind:style="{ width: (1.0 - timeNormalized) * 100 + '%' }" />
      <div class="text">
        <span id="minute" @click="enableMinuteEdit">{{ timerMinuteStr }}<input id="minuteEditor" type="tel" :value="timerMinuteStr" @input="setMinute($event.target.value)" @blur="disableMinuteEdit" @keydown.enter="disableMinuteEdit" v-if="isMinuteEditing"></span>
        <span>:</span>
        <span id="second" @click="enableSecondEdit">{{ timerSecondStr }}<input id="secondEditor" type="tel" :value="timerSecondStr" @input="setSecond($event.target.value)" @blur="disableSecondEdit" @keydown.enter="disableSecondEdit" v-if="isSecondEditing"></span>
      </div>
    </div>
    <div id="controlPanel">
      <div id="mainControl">
        <button class="button-huge is-green" v-on:click="start" v-if="!timerObj">
          <font-awesome-icon icon="play" /><br/>
          Start
        </button>
        <button class="button-huge is-red" v-on:click="stop" v-if="timerObj">
          <font-awesome-icon icon="pause" /><br/>
          Stop
        </button>
        <button class="button-huge" v-on:click="initialize();">
          <font-awesome-icon icon="redo-alt" /><br/>
          Reset
        </button>
      </div>
      <div id="minutesControl">
        <button class="button-minutes" v-for="minute in [1, 3, 5, 10, 30, 60]" v-bind:key="minute" v-on:click="initialize(minute * 60 * 1000);">
          <span class="minutes">{{ minute }}</span><br/>
          min
        </button>
        <button class="button-minutes only-fullhd" v-for="minute in [90, 120]" v-bind:key="minute" v-on:click="initialize(minute * 60 * 1000);">
          <span class="minutes">{{ minute }}</span><br/>
          min
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faRedoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
 
  library.add([faRedoAlt, faPlay, faPause])
  export default {
    name: 'Timer',
    data() {
      return {
        nowDate: moment(),
        timerEndDate: moment(),
        timerObj: null,
        remainTime: null,
        isMinuteEditing: false,
        isSecondEditing: false,
        defaultLimit: null,
      }
    },
    created: function() {
      this.initialize(30 * 60 * 1000);
    },
    updated: function() {
      document.title = this.timeStr;
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
      },

      enableMinuteEdit: function() {
        this.isMinuteEditing = true;
        // v-ifで表示されるのを待機するため、10ミリ秒遅延
        setTimeout(function() {document.getElementById('minuteEditor').focus()}, 10);
      },
      disableMinuteEdit: function() {
        this.isMinuteEditing = false;
      },

      enableSecondEdit: function() {
        this.isSecondEditing = true;
        // v-ifで表示されるのを待機するため、10ミリ秒遅延
        setTimeout(function() {document.getElementById('secondEditor').focus()}, 10);
      },
      disableSecondEdit: function() {
        this.isSecondEditing = false;
      },
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
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='sass'>
  @import "../../node_modules/bulma/bulma.sass"

  @font-face
    font-family: 'Memoir'
    src: url('../assets/memoir-square.otf') format('truetype')

  #timer
    font-family: 'Memoir'

    #display
      position: relative
      background-color: #EBF1F2

      .text
        color: #644013
        span
          position: relative
          input[type="tel"]
            position: absolute
            left: 0
            top: 0
            font-family: 'Memoir'
            font-size: 6rem
            text-align: center
            min-width: 6rem
            width: 100%
            height: 100%

      .bar
        position: absolute
        content: ""
        background-color: #F29B30
        left: 0
        height: 100%

    #controlPanel
      margin-top: 20px
      display: flex
      justify-content: space-between
      #mainControl
        display: flex
        justify-content: space-between
      #minutesControl
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        align-content: space-between

    button
      font-family: 'Memoir'
      border-style: none
      color: #644013
      background-color: #F2D06B
      &.is-red
        color: white
        background-color: #E74747
      &.is-green
        color: white
        background-color: #00CE33
    
    button.button-huge
      border-radius: 50%

    button.button-minutes
      border-radius: 25%

    // responsive layout
    +touch
      #display
        font-size: 7rem
        line-height: 10rem
        height: 10rem
        .text span input[type="tel"]
          font-size: 6rem
          min-width: 6rem
      #controlPanel
        display: block
        #mainControl
          justify-content: space-around
        #minutesControl
          margin: 4vw 2vw
          height: 64vw
      button.button-huge
        width: 40vw
        height: 40vw
        font-size: 2rem
        svg
          padding: 10px
          font-size: 7rem
      button.button-minutes
        width: 30vw
        height: 30vw
        font-size: 2rem
        .minutes
          font-size: 5rem

    +desktop
      #display
        font-size: 10rem
        line-height: 14rem
        height: 14rem
        .text span input[type="tel"]
          font-size: 6rem
          min-width: 6rem
      #controlPanel
        #mainControl
          width: 540px
          height: 260px
        #minutesControl
          width: 400px
          height: 260px
      button.button-huge
        width: 260px
        height: 260px
        font-size: 40px
        svg
          padding: 10px
          font-size: 120px
      button.button-minutes
        width: 120px
        height: 120px
        font-size: 24px
        .minutes
          font-size: 56px

    +widescreen
      #display
        font-size: 12rem
        line-height: 16rem
        height: 16rem
        .text span input[type="tel"]
          font-size: 8rem
          min-width: 8rem
      #controlPanel
        #mainControl
          width: 648px
          height: 314px
        #minutesControl
          width: 481px
          height: 314px
      button.button-huge
        width: 314px
        height: 314px
        font-size: 50px
        svg
          padding: 10px
          font-size: 140px
      button.button-minutes
        width: 147px
        height: 147px
        font-size: 32px
        .minutes
          font-size: 60px

    @include until($fullhd)
      .only-fullhd
        display: none
    +fullhd
      #controlPanel
        #minutesControl
          width: 648px

</style>
