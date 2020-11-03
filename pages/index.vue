<template>
  <div class="click">
    <img :class="['big-click', {'big-click-fire' : bcf}, {'big-click-stay': !bcf}]" src="@/assets/bigClick.png" alt="bigClick" @click="click">
    <transition
      v-for="(count,i) in clickBuffer"
      :key="i"
    >
      <div v-show="count.show" class="click-count" @click.stop="click">
        {{ count.value }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bcf: false,
      SpC: '1',
      clickBuffer: [],
      bufferIndex: 0
    }
  },
  created () {
    this.clickBuffer = [...Array(50)]
    for (let i = 0; i < this.clickBuffer.length; i++) {
      this.clickBuffer[i] = {
        value: this.$store.getters['clicker/SpC'],
        show: false
      }
    }
  },
  methods: {
    click () {
      this.$store.dispatch('clicker/increment', 1)
      const index = this.bufferIndex
      this.clickBuffer[index].value = this.$store.getters['clicker/SpC']
      this.clickBuffer[index].show = true
      this.bcf = !this.bcf
      if (this.clickBuffer[index].show) {
        setTimeout(() => {
          this.clickBuffer[index].show = false
        }, 1500)
        this.bufferIndex++
        this.bufferIndex %= this.clickBuffer.length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.big-click{
  @include center;
  height: min(70vmin, 288px);
  width: min(70vmin, 288px);
}

.big-click-fire{
  animation: anime 1s linear;
}

.big-click-stay{
  animation: anime_stay 1s linear;
}

.click-count-group{
}

.click-count{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 0;
}

.v{
  &-enter{
    opacity: 0;
    &-active{
      transition: all ease-out 1.5s;
      opacity: 1;
    }
    &-to{
      opacity: 0;
      transform: translateY(-240px);
    }
  }
}

</style>
