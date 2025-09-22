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
        indicator: [
          { name: '温度状态', max: 100 },
          { name: '振动状态', max: 100 },
          { name: '压力状态', max: 100 },
          { name: '转速状态', max: 100 },
          { name: '燃油状态', max: 100 },
          { name: '润滑状态', max: 100 },
        ],
        series: [
          {
            name: 'GE9X-001',
            value: [85, 92, 78, 95, 88, 90],
            itemStyle: { color: '#FF6B6B' }
          },
          {
            name: 'CFM56-002',
            value: [92, 88, 85, 90, 82, 87],
            itemStyle: { color: '#4ECDC4' }
          },
          {
            name: 'LEAP-003',
            value: [78, 85, 92, 88, 95, 85],
            itemStyle: { color: '#45B7D1' }
          },
          {
            name: 'GE9X-004',
            value: [88, 78, 85, 92, 90, 88],
            itemStyle: { color: '#FFA07A' }
          },
        ],
      },
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss"></style>
