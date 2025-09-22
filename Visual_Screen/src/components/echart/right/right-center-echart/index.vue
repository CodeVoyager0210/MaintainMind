<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  components: {
    Chart,
  },
  data() {
    return {
      cdata: {
        data: ['00', '04', '08', '12', '16', '20', '24'],
        egt: [650, 680, 720, 750, 730, 690, 660],
        n1: [85, 88, 92, 95, 93, 89, 86],
        nf: [58, 62, 65, 68, 66, 63, 60],
        egtv: [680, 710, 740, 780, 760, 720, 690],
        vibration: [2.1, 2.3, 2.8, 3.2, 2.9, 2.5, 2.2]
      },
    }
  },
}
</script>
