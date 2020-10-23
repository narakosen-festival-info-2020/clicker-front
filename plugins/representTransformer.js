import Vue from 'vue'

Vue.mixin({
  methods: {
    representTransform (data) {
      if (!data) {
        return 0
      }
      if (data <= 1e9) {
        return Math.round(data)
      } else {
        return data.toExponential(3)
      }
    }
  }
})
