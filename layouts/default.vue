<template>
  <div class="main">
    <div class="header">
      <h1> {{ displayCount }}</h1>
      <h2>Shika Sembei(s)!</h2>
    </div>
    <nuxt class="game" />
    <div class="menu-bar">
      <div
        v-for="(menu) in gameMenus"
        :key="menu.name"
        class="menu-item"
      >
        <nuxt-link
          class="menu-link"
          :to="menu.url"
        >
          <div class="menu-text">
            {{ menu.name }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      socket: new WebSocket('ws://clicker-back-lb-465582205.ap-northeast-1.elb.amazonaws.com:80/clicker'),
      // socket: new WebSocket('ws://localhost:80/clicker'),
      gameMenus: [
        {
          name: 'クリック',
          url: '/'
        },
        {
          name: '施設',
          url: '/facility'
        },
        {
          name: '状態',
          url: '/statement'
        },
        {
          name: '実績',
          url: '/achievement'
        }
      ],
      connectionError: false,
      count: 0.0, // 内部的な値、実数
      displayCount: 'Waiting server...', // 実際に表示する値、整数or文字列
      sembeiAnim: this.gameAnimationCalc(),
      clickCountBuffer: 0
    }
  },
  created () {
    this.socket.onmessage = (e) => {
      this.count = JSON.parse(e.data).count
    }
    this.socket.onopen = () => {
      this.connectionError = false
      this.socket.send(JSON.stringify({
        count: 0
      }))
      this.gameAnimation()
    }
    this.socket.onerror = () => {
      this.displayCount = 'Connection Error'
      this.connectionError = true
    }
    this.socket.onclose = () => {
      this.displayCount = 'Connection Had Closed'
      this.connectionError = true
    }
  },
  methods: {
    gameAnimation () {
      // 描画ごとにクリックがあれば送信する
      this.updateClickCount()
      if (this.clickCountBuffer) {
        this.socket.send(JSON.stringify({
          count: this.clickCountBuffer
        }))
        this.clickCountBuffer = 0
      }
      this.sembeiAnim()
    },
    gameAnimationCalc () {
      let representCount = 0.0 // 表示しうる値、実数
      // let globalFrame = 0
      return function calc () {
        representCount = representCount * 0.9 + this.count * 0.1
        this.displayCount = this.representTransform(representCount)
        // globalFrame++
        requestAnimationFrame(this.gameAnimation)
      }
    },
    updateClickCount () {
      this.clickCountBuffer = this.$store.getters['clicker/count']
      this.$store.dispatch('clicker/reset')
    }
  }
}
</script>

<style lang='scss' scoped>
// header
.header{
  h1, h2{
    margin: 8px 0;
  }
  overflow: hidden;
  height: 15vh;
  text-align: center;
}

// game
.game{
  height: calc(100vh - 15vh - min(10vh, 80px));
  overflow: hidden;
  width: 100%;
}

// menu
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

  .menu-item{
    display: inline-block;
    width: min(25% , 200px);
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-left: $menu-border;
    &:last-child{
      border-right: $menu-border;
    }

    .menu-link{
      display: block;
      width: 100%;
      height: 100%;
      .menu-text{
        @include center;
      }
      &:link{
        color: black;
      }
      &:visited{
        color: black;
      }
      &:hover{
        color: black;
      }
      &:active{
        color: black;
      }
    }

    &:hover{
      cursor: pointer;
      background: #c0c0c0;
    }

  }
}
</style>
