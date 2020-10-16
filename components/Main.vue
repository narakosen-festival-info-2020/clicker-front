<template>
  <div class="main">
    <Header>
      <h1>{{ displayCount }}</h1>
    </Header>
    <Click @clickCount="click" @buy="buy" />
    <Menubar />
  </div>
</template>

<script>
import Menubar from '@/components/Menubar'
import Header from '@/components/Header'
import Click from '@/components/game/Click'
export default {
  name: 'Main',
  components: { Header, Menubar, Click },
  data () {
    return {
      socket: new WebSocket('ws://localhost:80/clicker'),
      message: '',
      answer: {
        count: 0
      },
      count: 0.0, // 内部的な値、実数
      representCount: 0.0, // 表示しうる値、実数
      displayCount: 'Waiting server...', // 実際に表示する値、整数or文字列
      clickCountBuffer: 0,
      factory: 0,
      globalFrame: 0,
      connectionError: false
    }
  },
  created () {
    const self = this
    self.socket.onmessage = (e) => {
      self.answer = JSON.parse(e.data)
    }
    self.socket.onopen = () => {
      self.socket.send(JSON.stringify({
        count: 0
      }))
      self.gameAnimation()
    }
    self.socket.onerror = () => {
      self.displayCount = 'Connection Error'
      self.connectionError = true
    }
  },
  mounted () {
  },
  methods: {
    click () {
      this.clickCountBuffer++
    },
    buy (cost) {
      this.socket.send(JSON.stringify({
        count: -cost
      }))
    },
    gameAnimation () {
      // 描画ごとにクリックがあれば送信する
      if (this.clickCountBuffer) {
        this.socket.send(JSON.stringify({
          count: this.clickCountBuffer
        }))
        this.clickCountBuffer = 0
      }
      this.count = this.answer.count
      this.representCount = this.representCount * 0.9 + this.count * 0.1
      if (this.representCount <= 1e9) {
        this.displayCount = Math.round(this.representCount)
      } else {
        this.displayCount = this.representCount.toExponential(3)
      }
      this.globalFrame++
      requestAnimationFrame(this.gameAnimation)
    }
  }
}
</script>

<style lang="scss">
.main{
  // width: 100%;
  height: 100vh;
  display: block;
  text-align: center;
}
</style>
