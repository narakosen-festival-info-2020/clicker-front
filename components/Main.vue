<template>
  <div class="main">
    <Header>
      {{ displayCount }}
    </Header>
    <div :is="gameComponent" class="game" @click="click" @buy="buy" />
    <Menubar />
  </div>
</template>

<script>
import Click from '@/components/game/Click'
import Building from '@/components/game/Building'
import Statement from '@/components/game/Statement'
import Achievement from '@/components/game/Achievement'
import Menubar from '@/components/Menubar'

export default {
  name: 'Main',
  components: { Menubar, Achievement, Statement, Building, Click },
  data () {
    return {
      socket: new WebSocket('ws://clicker-back-lb-465582205.ap-northeast-1.elb.amazonaws.com:80/clicker'),
      // socket: new WebSocket('ws://localhost:80/clicker'),
      message: '',
      answer: {
        count: 0
      },
      gameComponent: '', // components
      count: 0.0, // 内部的な値、実数
      representCount: 0.0, // 表示しうる値、実数
      displayCount: 'Waiting server...', // 実際に表示する値、整数or文字列
      clickCountBuffer: 0,
      buildings: [],
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
    self.socket.onclose = () => {
      self.displayCount = 'Connection Had Closed'
      self.connectionError = true
    }
    this.loadFacilities()
  },
  methods: {
    click () {
      this.clickCountBuffer++
    },
    async buy (name) {
      this.ip = await this.$axios.$post(`/api/facility/${name}`)
        .catch((error) => {
          alert('購入できませんでした')
          alert(error)
        })
      await this.loadFacilities()
    },
    async loadFacilities () {
      await this.$axios.$get('/api/facility', {
        responseType: 'json'
      })
        .then((response) => {
          this.buildings = [...response.facilities]
          this.buildings.sort((a, b) => a.num_gen - b.num_gen)
        })
        .catch((error) => {
          alert('サーバーエラー')
          alert(error)
        })
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

<style lang="scss" scoped>
.main{
  display: block;
}

.game{
  height: calc(100vh - 15vh - min(10vh, 80px));
  margin: 0 auto; //TODO:横のセンタリングでバグらせない方法
  width: 100%;
  max-width: 840px;
}

</style>
