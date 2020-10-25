<template>
  <div class="click">
    <img :class="['big-click', {'big-click-fire' : bcf}]" src="@/assets/bigClick.png" alt="bigClick" @click="click">
  </div>
</template>

<script>
export default {
  data () {
    return {
      bcf: false
    }
  },
  methods: {
    click () {
      this.bcf = false
      requestAnimationFrame(() => {
        this.bcf = true
        console.log(this.bcf)
      })
      console.log(this.bcf)
      this.$store.dispatch('clicker/increment', 1)
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
  animation: anime .5s linear;
}

@function fuyofuyo($i){
  @if $i < 0.5 {
    @return 0.4 * pow(2*$i, 5) * sin(44 * $i,true) + 1;
  } @else {
    @return 0.4 * pow(2 - 2*$i, 5) * sin(44 * $i,true) + 1;
  }
}

@function pow($base, $exp){
  $value: $base;
  @if $exp >= 1 {
    @for $i from 1 through $exp {
      $value: $value * $base;
    }
  } @else if $exp <= -1 {
    @for $i from 1 through -$exp {
      $value: $value / $base;
    }
  } @else {
    $value: 1;
  }
  @return $value;
}

@function fact($val){
  $value: 1;
  @if $val > 0{
    @for $i from 1 through $val{
      $value: $value * $i;
    }
  } @else {
    $value: 1;
  }
  @return $value;
}

$pi: 3.14159265359; // 円周率
$iter: 30;
@function sin($angle, $degrees: false) {
  $sin: 0;
  @if $degrees {
    $angle: $angle / 180 * $pi;
  }
  @for $n from 0 through $iter - 1 {
    $sin: $sin + (pow(-1, $n) / fact(2*$n + 1)) * pow($angle, 2*$n + 1);
  }
  @return $sin;
}

@keyframes anime {
  @for $i from 0 through 100 {
    #{$i}% {transform: translate(-50%,-50%) scale(fuyofuyo($i / 100))};
  }
}
</style>
