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
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        series: [
          {
            name: '实际寿命',
            data: [2500, 2400, 2250, 2100, 1950, 1800, 1650, 1500, 1350, 1200, 1050, 900],
            color: '#FF6B6B'
          },
          {
            name: '理论寿命',
            data: [2000, 1850, 1700, 1550, 1400, 1250, 1100, 950, 800, 650, 500, 350],
            color: '#4ECDC4'
          },
          {
            name: '预测趋势',
            data: [null, null, null, null, null, null, 1650, 1450, 1250, 1050, 850, 650],
            color: '#FFD700'
          },
        ],
      },
    }
  },

  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>