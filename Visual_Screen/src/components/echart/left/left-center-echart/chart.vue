<template>
  <div>
    <Echart
      :options="options"
      id="LeftCenterEchart"
      height="255px"
      width="100%"
    ></Echart>
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
        // 计算差值数据
        const diffData = newData.series[0].data.map((val, idx) =>
          val - newData.series[1].data[idx]
        );

        this.options = {
          backgroundColor: 'transparent',
          grid: {
            left: '8%',
            right: '8%',
            bottom: '15%',
            top: '18%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00afca',
            textStyle: {
              color: '#fff',
            },
            formatter: function (params) {
              let result = params[0].name + '<br/>';
              params.forEach(function (item) {
                if (item.seriesName === '寿命差值') {
                  result += item.seriesName + ': ' + item.value + '小时<br/>';
                } else {
                  result += item.seriesName + ': ' + item.value + '小时<br/>';
                }
              });
              return result;
            },
          },
          legend: {
            data: ['实际寿命', '理论寿命', '寿命差值'],
            textStyle: {
              color: '#00afca',
              fontSize: 12,
            },
            bottom: 5,
          },
          xAxis: {
            type: 'category',
            data: newData.categories,
            axisLabel: {
              textStyle: {
                color: '#00afca',
                fontSize: '12',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#00afca',
              },
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              name: '剩余寿命(小时)',
              nameTextStyle: {
                color: '#00afca',
                fontSize: 12,
              },
              axisLabel: {
                textStyle: {
                  color: '#00afca',
                  fontSize: '12',
                },
              },
              axisLine: {
                lineStyle: {
                  color: '#00afca',
                },
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0, 175, 202, 0.2)',
                  type: 'dashed',
                },
              },
            },
            {
              type: 'value',
              name: '差值(小时)',
              nameTextStyle: {
                color: '#FFD700',
                fontSize: 12,
              },
              axisLabel: {
                textStyle: {
                  color: '#FFD700',
                  fontSize: '12',
                },
              },
              axisLine: {
                lineStyle: {
                  color: '#FFD700',
                },
              },
              splitLine: {
                show: false,
              },
            }
          ],
          series: [
            {
              name: '实际寿命',
              type: 'line',
              data: newData.series[0].data,
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                color: '#FF6B6B',
                width: 2,
              },
              itemStyle: {
                color: '#FF6B6B',
              },
            },
            {
              name: '理论寿命',
              type: 'line',
              data: newData.series[1].data,
              smooth: true,
              symbol: 'triangle',
              symbolSize: 6,
              lineStyle: {
                color: '#4ECDC4',
                width: 2,
              },
              itemStyle: {
                color: '#4ECDC4',
              },
            },
            {
              name: '寿命差值',
              type: 'bar',
              yAxisIndex: 1,
              data: diffData,
              itemStyle: {
                color: function(params) {
                  return params.value >= 0 ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 69, 0, 0.6)';
                },
              },
              barWidth: '40%',
            },
            {
              name: '差值面积',
              type: 'line',
              data: diffData,
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(255, 215, 0, 0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(255, 215, 0, 0.05)',
                    },
                  ],
                },
              },
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