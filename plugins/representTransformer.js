import Vue from 'vue'

Vue.mixin({
  methods: {
    representTransform (data, digit) {
      if (!digit) {
        digit = 0
      }
      const digitMul = Math.pow(10, digit)
      if (!data) {
        return 0
      }
      if (data <= 1e9) {
        return (Math.round(data * digitMul) / digitMul).toLocaleString()
      } else {
        return data.toExponential(3)
      }
    }
  }
})
