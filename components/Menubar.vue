<template>
  <div class="menu-bar">
    <div v-for="menu in gameMenus" :key="menu.name" class="menu-item" @click="gameSelect(menu.component)">
      <span>
        {{ menu.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  data () {
    return {
      gameMenus: [
        {
          name: 'クリック',
          component: 'Click'
        },
        {
          name: '施設',
          component: 'Building'
        },
        {
          name: '状態',
          component: 'Statement'
        },
        {
          name: '実績',
          component: 'Achievement'
        }
      ]
    }
  },
  mounted () {
    this.gameSelect('Click')
  },
  methods: {
    gameSelect (component) {
      this.$parent.gameComponent = component
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
  text-align: center;
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
