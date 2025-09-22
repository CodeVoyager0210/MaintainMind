<template>
  <div>
    <Echart
      :options="options"
      id="RightCenterEchart"
      height="255px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
    }
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          backgroundColor: 'transparent',
          grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                show: true,
              },
              splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                  color: '#f00',
                },
              },
              axisLabel: {
                color: '#00afca',
                textStyle: {
                  fontSize: '18',
                  fontFamily: 'cursive', // 设置字体系列为sans-serif
                },
              },
              splitLine: {
                show: false,
              },
              boundaryGap: false,
              data: newData.data,
            },
          ],

          yAxis: [
            {
              type: 'value',
              min: 0,
              max: 100,
              splitNumber: 5,
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,0.1)',
                },
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                  color: '#d1e6eb',
                },
              },
              axisTick: {
                show: false,
              },
            },
            {
              type: 'value',
              min: 600,
              max: 1000,
              splitNumber: 4,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                  color: '#d1e6eb',
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: 'N1 (%)',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#4ecdc4',
                  shadowColor: 'rgba(78, 205, 196, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#4ecdc4',
                },
              },
              itemStyle: {
                color: '#4ecdc4',
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: 'rgba(78, 205, 196, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: true,
                formatter: '{b}: {c}%'
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(78,205,196,0.3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(78,205,196,0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(78,205,196, 0.9)',
                  shadowBlur: 20,
                },
              },
              data: newData.n1,
            },
            {
              name: 'NF (%)',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#45b7d1',
                  shadowColor: 'rgba(69, 183, 209, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#45b7d1',
                },
              },
              itemStyle: {
                color: '#45b7d1',
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: 'rgba(69, 183, 209, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: true,
                formatter: '{b}: {c}%'
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(69,183,209,0.3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(69,183,209,0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(69,183,209, 0.9)',
                  shadowBlur: 20,
                },
              },
              data: newData.nf,
            },
            {
              name: 'EGT (°C)',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              yAxisIndex: 1,
              lineStyle: {
                normal: {
                  color: '#ff6b6b',
                  shadowColor: 'rgba(255, 107, 107, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#ff6b6b',
                },
              },
              itemStyle: {
                color: '#ff6b6b',
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: 'rgba(255, 107, 107, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: true,
                formatter: '{b}: {c}°C'
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(255,107,107,0.3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,107,107,0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(255,107,107, 0.9)',
                  shadowBlur: 20,
                },
              },
              data: newData.egt,
            },
          ],
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>