<template>
  <div class="click">
    <div class="centering">
      <img class="big-click" src="@/assets/bigClick.png" alt="bigClick" @click="click">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Click',
  methods: {
    click () {
      this.$parent.clickCountBuffer++
      this.$parent.clickCountBuffer += 1e11
      // this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.centering{
  position: relative;
  top: 40%;
  left: 50%;
  height: 1px;
  width: 1px;
  cursor: pointer;
  text-align: center;
}
.big-click{
  @include center;
  height: 288px;
  width: 288px;
}
</style>
