<template>
  <div
    v-tooltip="!unlocked?'???':name + '<br>' + description"
    :class="unlocked?'unlocked':'locked'"
    class="achievement-box"
  >
    <p> {{ id }} </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: '実績'
    },
    description: {
      type: String,
      default: '実績の説明です。'
    },
    unlocked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.achievement-box{
  text-align: center;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  margin: 1px;
  word-wrap: normal;
  border: 1px solid #2d2219;
  background: rgb(209, 209, 209);
  &.locked{
    opacity: 0.2
  }
  &.unlocked{
    opacity: 1.0
  }
}

// referred URL:https://github.com/Akryum/v-tooltip?ref=kabanoki.net#sass--less
.tooltip {
  display: block !important;
  z-index: 10000;
  max-width: 95%;

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
    $popoverColor: #f9f9f9;

    .popover-inner {
      background: $popoverColor;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $popoverColor;
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
