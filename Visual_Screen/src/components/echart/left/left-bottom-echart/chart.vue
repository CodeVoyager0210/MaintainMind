<template>
  <div>
    <Echart
      :options="options"
      id="LeftBottomEchart"
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
        // 为每个图例单独设置位置
        // 这里示例将四个图例分别放在左上、右上、左下、右下
        const legendPositions = [
          { top: 10, left: 30 },    // 第一个图例：左上
          { top: 10, right: 30 },   // 第二个图例：右上
          { bottom: 10, left: 30 }, // 第三个图例：左下
          { bottom: 10, right: 40 } // 第四个图例：右下
        ];
        
        this.options = {
          backgroundColor: 'transparent',
          // 将legend改为数组，每个元素对应一个图例的配置
          legend: newData.series.map((item, index) => ({
            data: [item.name],  // 每个图例只显示一个系列名称
            textStyle: {
              color: '#4eaafd',
              fontSize: 14,
            },
            // 应用对应位置配置，如果图例数量超过预设位置，使用默认位置
            ...(legendPositions[index] || { top: 10, left: 'center' }),
            // 防止图例重叠显示
            formatter: '{name}',
            itemWidth: 12,
            itemHeight: 12
          })),
          radar: {
            indicator: newData.indicator,
            name: {
              textStyle: {
                color: '#fff',
                fontSize: 11,
              },
              formatter: function(value) {
                if (value === '转速状态') {
                  return '转速状态';
                }
                return value;
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(78, 170, 253, 0.3)',
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(78, 170, 253, 0.5)',
              },
            },
            splitArea: {
              show: false,
            },
          },
          series: [
            {
              type: 'radar',
              data: newData.series.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: item.itemStyle,
                lineStyle: {
                  color: item.itemStyle.color,
                  width: 2,
                },
                areaStyle: {
                  color: item.itemStyle.color,
                  opacity: 0.1,
                },
              })),
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
