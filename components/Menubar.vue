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

<style lang="scss">
.menu-bar{
  display: block;
  height: 10%;
  width: 100%;
  max-height: 80px;
  position: absolute;
  bottom: 0;
  background: #999383;
  font-size: 18px;
}
@media screen and (max-width: 600px) {
  .menu-bar{
    font-size: 16px;
  }
}
@media screen and (max-width: 992px) {
  .menu-bar{
    font-size: 14px;
  }
}
.menu-container{
  height: 100%;
  max-width: 600px;
  width: 100%;
  margin: auto;
}
.menu-item{
  width: 25%;
  // height: 50px;
  height: 100%;
  float: left;
}
.menu-item:hover{
  cursor: pointer;
  background: #837d68;
}
</style>
