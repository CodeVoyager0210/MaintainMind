<template>
  <div id="RightCenter">
    <dv-border-box-13>
      <HeaderTitle title="发动机性能参数" />
      <RigthtCenterEarch />
    </dv-border-box-13>
  </div>
</template>

<script>
import RigthtCenterEarch from '_c/echart/right/right-center-echart/index.vue'
export default {
  components: {
    RigthtCenterEarch,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss">
#RightCenter {
  width: 100%;
  height: 310px;
  padding: 10px;
}
</style>
