<template>
  <div class="achievement">
    <Achievement
      v-for="data in achievements"
      :id="data.id"
      :key="data.id"
      :description="data.description"
    />
  </div>
</template>

<script>
import Achievement from '@/components/Achievement'

export default {
  components: {
    Achievement
  },
  data () {
    return {
      achievements: []
    }
  },
  created () {
    for (let i = 0; i < 500; i++) {
      this.achievements.push({
        id: i,
        // ダミー説明文
        description: `実績${i}は実績による実績のための実績です。実績である。実績である。実績である。実績である。実績である。実績である。実績である。実績である。実績。`,
        // unlocked: false
        unlocked: i % 5 === 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.achievement{
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}
</style>
