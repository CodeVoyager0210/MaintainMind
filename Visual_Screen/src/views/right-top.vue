<template>
  <div id="RightTop">
    <dv-border-box-13>
      <HeaderTitle title="健康状态评估" />
      <div class="health-metrics">
        <div class="metric">
          <dv-decoration-9 style="width: 100%; height: 100px; color: #516b91"
            >92%</dv-decoration-9
          >
          <p class="health-text">整体健康度</p>
        </div>
        <div class="metric">
          <dv-decoration-9 style="width: 100%; height: 100px; color: #516b91"
            >1420</dv-decoration-9
          >
          <p class="health-text">剩余寿命(小时)</p>
        </div>
        <div class="metric">
          <dv-decoration-9 style="width: 100%; height: 100px; color: #516b91"
            >1.8%</dv-decoration-9
          >
          <p class="health-text">故障概率</p>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss">
#RightTop {
  height: 310px;
  width: 100%;
  padding: 10px;
}
.health-metrics {
  height: 250px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.metric {
  width: 28%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.health-text {
  color: #00afca;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
