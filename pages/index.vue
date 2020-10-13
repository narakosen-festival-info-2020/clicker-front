<template>
  <div class="container">
    <div>
      <label>
        <h2>You have ...</h2>
        <h1>{{ displayCount }}</h1>
        <h2>Shika Sembei(es)!</h2>
      </label>
      <input type="button" value="クリック" @click="click">
      <input type="button" value="+100" @click="buy(-100)">
      <input type="button" value="-100" @click="buy(100)">
      <input type="button" value="+1e9" @click="buy(-1e9)">
      <input type="button" value="-1e9" @click="buy(1e9)">
      <input type="button" value="+1e18" @click="buy(-1e18)">
      <input type="button" value="-1e18" @click="buy(1e18)">
    </div>
  </div>
</template>

<script>
import { w3cwebsocket } from 'websocket'
const W3cwebsocket = w3cwebsocket

export default {
  data () {
    return {
      socket: new W3cwebsocket('ws://localhost:8000/ws'),
      message: '',
      answer: {
        count: 0
      },
      count: 0.0, // 内部的な値、実数
      representCount: 0.0, // 表示しうる値、実数
      displayCount: 0, // 実際に表示する値、整数or文字列
      clickCountBuffer: 0,
      factory: 0
    }
  },
  created () {
    const self = this
    self.socket.onmessage = function (e) {
      self.answer = JSON.parse(e.data)
    }
    // 20ミリ秒ごとにクリックがあれば送信する
    setInterval(function (self) {
      if (self.clickCountBuffer) {
        self.socket.send(JSON.stringify({
          count: self.clickCountBuffer
        }))
        self.clickCountBuffer = 0
      }
    }, 20, this)
    this.gameAnimation()
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
      this.count = this.answer.count
      this.representCount = this.representCount * 0.9 + this.count * 0.1 + 1e-2
      if (this.representCount <= 1e9) {
        this.displayCount = Math.floor(this.representCount)
      } else {
        this.displayCount = this.representCount.toExponential(3)
      }
      requestAnimationFrame(this.gameAnimation)
    }
  }
}
</script>

<style>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
