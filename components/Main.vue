<template>
  <div class="main">
    <Header>
      {{ displayCount }}
    </Header>
    <div :is="gameComponent" class="game" @click="click" @buy="buy" />
    <Menubar @gameSelect="gameSelect" />
  </div>
</template>

<script>
import Click from '@/components/game/Click'
import Building from '@/components/game/Building'
import Statement from '@/components/game/Statement'
import Achievement from '@/components/game/Achievement'
export default {
  name: 'Main',
  components: { Achievement, Statement, Building, Click },
  data () {
    return {
      socket: new WebSocket('ws://localhost:80/clicker'),
      message: '',
      answer: {
        count: 0
      },
      gameComponents: [
        'Click', 'Building', 'Statement', 'Achievement'
      ],
      currentGameComponentIndex: 0,
      count: 0.0, // 内部的な値、実数
      representCount: 0.0, // 表示しうる値、実数
      displayCount: 'Waiting server...', // 実際に表示する値、整数or文字列
      clickCountBuffer: 0,
      factory: 0,
      globalFrame: 0,
      connectionError: false
    }
  },
  computed: {
    gameComponent () {
      return this.gameComponents[this.currentGameComponentIndex]
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
    self.socket.onclose = () => {
      self.displayCount = 'Connection Had Closed'
      self.connectionError = true
    }
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
    },
    gameSelect (id) {
      this.currentGameComponentIndex = id
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: block;
  text-align: center;
}

.game{
  height: 75vh;
}

</style>
