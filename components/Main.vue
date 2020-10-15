<template>
  <div class="main">
    <h2>You have ...</h2>
    <h1>{{ displayCount }}</h1>
    <h2>Shika Sembei(es)!</h2>
    <input type="button" value="クリック" @click="click">
    <input type="button" value="+100" @click="buy(-100)">
    <input type="button" value="-100" @click="buy(100)">
    <input type="button" value="+1e9" @click="buy(-1e9)">
    <input type="button" value="-1e9" @click="buy(1e9)">
    <input type="button" value="+1e18" @click="buy(-1e18)">
    <input type="button" value="-1e18" @click="buy(1e18)">
  </div>
</template>

<script>
export default {
  name: 'Main',
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
      globalFrame: 0
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

<style>
</style>
