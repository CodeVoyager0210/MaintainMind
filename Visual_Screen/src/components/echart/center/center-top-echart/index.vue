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
        point_circle: [
          {
            value: [116.404, 39.915],
            label: {
              name: '北京',
            },
            itemStyle: {
              color: '#ff6b6b',
            },
          },
          {
            value: [121.474, 31.230],
            label: {
              name: '上海',
            },
            itemStyle: {
              color: '#4ecdc4',
            },
          },
          {
            value: [113.264, 23.129],
            label: {
              name: '广州',
            },
            itemStyle: {
              color: '#45b7d1',
            },
          },
          {
            value: [114.057, 22.543],
            label: {
              name: '深圳',
            },
            itemStyle: {
              color: '#ffa07a',
            },
          },
          {
            value: [120.155, 30.274],
            label: {
              name: '杭州',
            },
          },
          {
            value: [106.551, 29.563],
            label: {
              name: '重庆',
            },
          },
          {
            value: [108.948, 34.263],
            label: {
              name: '西安',
            },
          },
          {
            value: [104.066, 30.572],
            label: {
              name: '成都',
            },
          },
          {
            value: [118.767, 32.041],
            label: {
              name: '南京',
            },
          },
          {
            value: [114.305, 30.581],
            label: {
              name: '武汉',
            },
          },
        ],
        point_line: [
          {
            coords: [
              [116.404, 39.915], // 北京
              [121.474, 31.230], // 上海
            ],
            label: {
              start: '北京',
              end: '上海',
            },
          },
          {
            coords: [
              [121.474, 31.230], // 上海
              [113.264, 23.129], // 广州
            ],
            label: {
              start: '上海',
              end: '广州',
            },
          },
          {
            coords: [
              [113.264, 23.129], // 广州
              [114.057, 22.543], // 深圳
            ],
            label: {
              start: '广州',
              end: '深圳',
            },
          },
          {
            coords: [
              [116.404, 39.915], // 北京
              [108.948, 34.263], // 西安
            ],
            label: {
              start: '北京',
              end: '西安',
            },
          },
          {
            coords: [
              [108.948, 34.263], // 西安
              [104.066, 30.572], // 成都
            ],
            label: {
              start: '西安',
              end: '成都',
            },
          },
          {
            coords: [
              [104.066, 30.572], // 成都
              [106.551, 29.563], // 重庆
            ],
            label: {
              start: '成都',
              end: '重庆',
            },
          },
          {
            coords: [
              [120.155, 30.274], // 杭州
              [118.767, 32.041], // 南京
            ],
            label: {
              start: '杭州',
              end: '南京',
            },
          },
          {
            coords: [
              [118.767, 32.041], // 南京
              [114.305, 30.581], // 武汉
            ],
            label: {
              start: '南京',
              end: '武汉',
            },
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
