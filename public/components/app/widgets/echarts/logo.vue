<template>
  <div>
    <chart
      width="128px"
      height="128px"
      :options="logo"
      :init-options="initOptions"
      autoresize
    />
  </div>
</template>

<script>
  import ECharts from '~/components/chart/ECharts'
  import logo from '~/api/app/echarts/logo'
  require('echarts-liquidfill');

  export default {
    components: {
      chart: ECharts
    },
    props: {
      initOptions: Object,
    },
    data() {
      return {
        logo
      }
    },
    computed: {},
  };
</script>
