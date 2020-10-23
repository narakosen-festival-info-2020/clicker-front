<template>
  <div class="menu-bar">
    <div v-for="(menu, i) in gameMenus" :key="menu.name" :class="['menu-item', {'menu-pic':gameMenusPic[i]}]" @click="gameSelect(i)">
      <div class="menu-text">
        {{ menu.name }}
      </div>
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
      ],
      gameMenusPic: new Array(4).fill(false),
      gameMenuSelectNum: 0
    }
  },
  created () {
    this.gameSelect(this.gameMenuSelectNum)
  },
  methods: {
    gameSelect (selectNum) {
      this.gameMenusPic.splice(this.gameMenuSelectNum, 1, false)
      this.$parent.gameComponent = this.gameMenus[selectNum].component
      this.gameMenusPic.splice(selectNum, 1, true)
      this.gameMenuSelectNum = selectNum
    }
  }
}
</script>

<style lang="scss" scoped>
$menu-border:1px solid black;

.menu-bar{
  display: block;
  height: min(10vh, 80px);
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #999999;
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
  position: relative;
  border-left: $menu-border;
  &:last-child{
    border-right: $menu-border;
  }

  & .menu-text{
    @include center;
  }

  &.menu-pic{
    background: #6b6b6b;
  }

  &:hover{
    cursor: pointer;
    background: #c0c0c0;
  }

}

</style>
