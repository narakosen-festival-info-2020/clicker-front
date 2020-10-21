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
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
.click{
  height: 80vh;
}
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
  height: 288px;
  width: 288px;
  top: -144px;
  left: -144px;
  position: absolute;
  font-size: 144px;
}
</style>
