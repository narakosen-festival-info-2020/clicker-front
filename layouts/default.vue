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
      socket: new WebSocket('wss://clicker-back.nitncfes.net/clicker'),
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
  mounted () {
    if (process.browser) {
      const touch = 'ontouchstart' in document.documentElement ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0
      if (touch) {
        try {
          for (const si in document.styleSheets) {
            const styleSheet = document.styleSheets[si]
            if (!styleSheet.rules) { continue }
            for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
              if (!styleSheet.rules[ri].selectorText) { continue }
              if (styleSheet.rules[ri].selectorText.match(':hover')) {
                styleSheet.deleteRule(ri)
              }
            }
          }
        } catch (ex) {}
      }
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
  @include sp-ip5 {
    h1{
      font-size: 1.8rem;
    }
    h2{
      font-size: 1.3rem;
    }
  }
  overflow: hidden;
  height: 15%;
  text-align: center;
}

// game
.game{
  height: calc(100% - 15% - min(10%, 80px));
  overflow: hidden;
  width: 100%;
}

// menu
$menu-border:1px solid black;

.menu-bar{
  display: block;
  height: min(10%, 80px);
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #999999;
  text-align: center;
  font-size: 18px;

  @include tab {
    font-size: 16px;
  }

  @include sp {
    font-size: 14px;
  }

  .menu-item{
    display: inline-block;
    width: min(25% , 200px);
    height: 100%;
    position: relative;
    overflow: hidden;
    .menu-link{
      display: block;
      width: 100%;
      height: 100%;
      .menu-text{
        @include center;
        width: 100%;
        transition: all .2s ease-out;
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
      background: #686868;
      .menu-text{
        transform: translate(-50%,-50%) rotate(30deg);
      }
    }
  }
}
</style>
