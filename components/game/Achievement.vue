<template>
  <div class="achievement">
    <div v-for="achieve in achievements" :key="achieve.id" v-tooltip="!achieve.unlocked?'???':achieve.name + '<br>' + achieve.description" :class="achieve.unlocked?'unlocked':'locked'" class="achievementBox">
      <p> {{ achieve.id }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Achievement',
  data () {
    return {
      achievements: []
    }
  },
  created () {
    for (let i = 0; i < 500; i++) {
      this.achievements.push({
        id: i,
        name: `実績${i}`,
        // ダミー説明文
        description: `実績${i}は実績による実績のための実績です。実績である。実績である。実績である。実績である。実績である。実績である。実績である。実績である。実績。`,
        // unlocked: false
        unlocked: i % 5 === 0
      })
    }
  }
}
</script>

<style lang="scss">
.achievement{
  text-align: center;
}
.achievement{
  text-align: left;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 12px;
}
.achievementBox{
  display: inline-block;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  margin: 1px;
  word-wrap: normal;
  border: #2d2219 solid 1px;
  // background: #544330;
}
.locked{
  opacity: 0.2
}
.unlocked{
  opacity: 1.0
}

// referred URL:https://github.com/Akryum/v-tooltip?ref=kabanoki.net#sass--less
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #35495e;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #35495e;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
