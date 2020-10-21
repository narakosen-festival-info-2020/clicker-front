<template>
  <div class="achievement">
    <div v-for="achieve in achievements" :key="achieve" class="achievementBox">
      <p> {{ achieve }} </p>
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
      this.achievements.push(`実績${i}`)
    }
  }
}
</script>

<style lang="scss">
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
</style>
