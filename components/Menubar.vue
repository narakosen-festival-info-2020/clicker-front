<template>
  <div class="menu-bar">
    <div v-for="(menu, i) in gameMenu" :key="menu" class="menu-item" @click="gameSelect(i)">
      <span>
        {{ menu }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  data () {
    return {
      gameMenu: [
        'クリック', '施設', '状態', '実績'
      ],
      gameComponents: [
        'Click', 'Building', 'Statement', 'Achievement'
      ]
    }
  },
  mounted () {
    this.gameSelect(0)
  },
  methods: {
    gameSelect (id) {
      this.$parent.gameComponent = this.gameComponents[id]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar{
  display: block;
  height: min(10vh, 80px);
  width: 100%;
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

.menu-item{
  display: inline-block;
  width: 25%;
  max-width: 200px;
  height: 100%;
  &:hover{
    cursor: pointer;
    background: #837d68;
  }
}

</style>
