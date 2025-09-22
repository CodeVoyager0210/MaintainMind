<template>
  <div style="position: relative">
    <Echart
      :options="options"
      id="CenterTopEchart"
      height="600px"
      width="100%"
    />
    <dv-decoration-12
      style="
        width: 150px;
        height: 150px;
        position: absolute;
        left: 10px;
        top: 15px;
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      options: {},
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          //  tooltip 该版本需在 option中定义才开启
          //  子图层可自定义内容
          tooltip: {
            //格式化内容，返回为空，地图组件不起作用，得在地图组件重新定义
            formatter: () => '',
            textStyle: {
              color: '#fff',
            },
          },
          backgroundColor: 'transparent',
          geo: {
            map: 'china',
            zoom: 1.1,
            roam: true,
            layoutCenter: ['50%', '50%'],
            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            layoutSize: '100%',
            itemStyle: {
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
                  },
                ],
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
              borderColor: 'rgba(147, 235, 248, 1)',
            },
            tooltip: {
              formatter: () => '',
            },
            emphasis: {
              //地图高亮
              itemStyle: {
                color: '#0c93e2',
              },
            },
          },
          series: [
            {
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                symbolSize: 8,
                color: '#E4AA0C',
                symbol: 'arrow',
                period: 6,
                trailLength: 0.7,
              },
              lineStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#ff6b6b',
                  },
                  {
                    offset: 0.3,
                    color: '#4ecdc4',
                  },
                  {
                    offset: 0.6,
                    color: '#45b7d1',
                  },
                  {
                    offset: 1,
                    color: '#ffa07a',
                  },
                ]),
                width: 3, //线条宽度
                curveness: 0.3,
                opacity: 0.8,
              },
              tooltip: {
                formatter({ data }) {
                  return `发动机运行路线：<br />
              起点：${data.label.start}<br />
              终点：${data.label.end}
              `
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#4eaafd',
                textStyle: {
                  color: '#fff',
                },
              },
              data: newData.point_line,
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              rippleEffect: {
                number: 3,
                scale: 6,
                brushType: 'stroke',
              },
              itemStyle: {
                color: '#14c9de',
                shadowColor: 'rgba(20, 201, 222, 0.8)',
                shadowBlur: 10,
              },
              tooltip: {
                formatter({ data }) {
                  return `发动机位置：${data.label.name}`
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#14c9de',
                textStyle: {
                  color: '#fff',
                },
              },
              label: {
                show: true,
                offset: [30, 0],
                color: '#ecdb5c',
                fontSize: 16,
                fontFamily: 'cursive',
                fontWeight: 'bold',
                formatter({ data }) {
                  return `${data.label.name}`
                },
              },
              symbolSize: function () {
                return 12;
              },
              data: newData.point_circle,
            },
          ],
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss"></style>
