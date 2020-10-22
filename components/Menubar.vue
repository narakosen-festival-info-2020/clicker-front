<template>
  <div class="menu-bar">
    <div class="menu-container">
      <div class="menu-item" @click="gameSelect(0)">
        <span> クリック </span>
      </div>
      <div class="menu-item" @click="gameSelect(1)">
        <span> 施設 </span>
      </div>
      <div class="menu-item" @click="gameSelect(2)">
        <span> 状態 </span>
      </div>
      <div class="menu-item" @click="gameSelect(3)">
        <span> 実績 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  methods: {
    gameSelect (id) {
      this.$emit('gameSelect', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar{
  display: block;
  height: 10vh;
  width: 100%;
  max-height: 80px;
  position: absolute;
  bottom: 0;
  background: #999383;
  font-size: 14px;

  @include tab {
    font-size: 16px;
  }

  @include sp {
    font-size: 18px;
  }
}

.menu-container{
  height: 100%;
  max-width: 600px;
  width: 100%;
  margin: auto;

  & .menu-item{
  width: 25%;
  height: 100%;
  float: left;
    &:hover{
      cursor: pointer;
      background: #837d68;
    }
  }
}

</style>
