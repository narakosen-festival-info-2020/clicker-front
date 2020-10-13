<template>
  <div class="container">
    <div>
      <label>
        <h2> You have ...</h2>
        <h1>{{ answer }}</h1>
      </label>
      <input type="button" value="クリック" @click="click">
      <input type="button" value="施設" @click="buyFactory">
      <p>
        施設: {{ factory }}
      </p>
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
      answer: '',
      clickCountBuffer: 0,
      count: 0,
      factory: 0
    }
  },
  created () {
    const self = this
    self.socket.onmessage = function (e) {
      const counter = JSON.parse(e.data).count
      self.answer = counter
    }
  },
  mounted () {
    // 20ミリ秒ごとにクリックがあれば送信する
    setInterval(function (self) {
      if (self.clickCountBuffer) {
        self.socket.send(JSON.stringify({
          count: self.clickCountBuffer
        }))
        self.clickCountBuffer = 0
      }
    }, 20, this)
  },
  methods: {
    click () {
      this.clickCountBuffer++
    },
    buyFactory () {
      this.factory += 1
      this.socket.send(JSON.stringify({
        count: -100
      }))
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
