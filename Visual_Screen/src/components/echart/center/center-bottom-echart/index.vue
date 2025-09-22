<template>
  <div>
    <dv-scroll-board
      style="width: 100%; height: 230px; padding: 0 20px"
      :config="config"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: [' 发动机编号 ', ' 运行周期 ', ' 压气机出口温度 ', ' 剩余寿命 ', ' 异常标签 '],
        data: [
['GE9X-001', '1', '882', '150', '0'],
['GE9X-001', '30', '889', '120', '0'],
['CFM56-002', '1', '865', '140', '0'],
['CFM56-002', '50', '876', '90', '0'],
['LEAP-003', '1', '872', '160', '0'],
['LEAP-003', '60', '885', '100', '0'],
['GE9X-004', '70', '898', '80', '0'],
['GE9X-004', '120', '915', '30', '0'],
['CFM56-005', '100', '895', '40', '0'],
['CFM56-005', '130', '930', '10', '1'],
['LEAP-006', '110', '902', '50', '0'],
['LEAP-006', '150', '928', '10', '0'],
['GE9X-007', '140', '942', '10', '1'],
['GE9X-007', '150', '978', '0', '1'],
['CFM56-008', '140', '965', '0', '1'],
['LEAP-009', '158', '955', '2', '1'],
['LEAP-009', '160', '983', '0', '1'],
['GE9X-010', '90', '905', '60', '0'],
['CFM56-011', '80', '890', '70', '0'],
],
        rowNum: 5, //表格行数
        headerBGC: 'rgba(41, 105, 177,0.3)', //表头
        oddRowBGC: 'transparent', //奇数行
        evenRowBGC: 'transparent', //偶数行
        hoverPause: false,
        // index: true,
        columnWidth: [138, 138, 138, 138, 138],
        align: ['center', 'center', 'center', 'center', 'center'],
      },
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss"></style>
