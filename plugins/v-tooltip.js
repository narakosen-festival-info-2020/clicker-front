import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
// スマホでもtooltipを見られるように、トリガーに'on click'を加える。
VTooltip.options.defaultTrigger += ' on click'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
