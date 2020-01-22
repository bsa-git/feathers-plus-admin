<template>
  <v-card
    :outlined="outlined"
  >
    <div class="d-flex justify-space-between align-center align-baseline">
      <v-card-title>
        <div class="subheading" :class="theme === 'dark'? 'white--text' : 'black--text' ">{{ title }}</div>
      </v-card-title>
      <v-card-subtitle>
        <span>{{subTitle}}</span>
        <v-icon small :color="iconColor">{{icon}}</v-icon>
      </v-card-subtitle>
    </div>
    <v-card-text class="pa-3">
      <chart
        :height="height"
        width="100%"
        :theme="theme"
        :options="getChartOptions"
        :ref="refChart"
        autoresize
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import ECharts from '~/components/chart/ECharts'

  const debug = require('debug')('app:comp.BoxChart');
  const isLog = true;

  export default {
    components: {
      chart: ECharts
    },
    props: {
      title: String,
      subTitle: String,
      theme: String,
      options: Object,
      data: Array,
      icon: String,
      height: {
        type: String,
        default: '300px',
      },
      iconColor: {
        type: String,
        default: 'success',
      },
      outlined: {
        type: Boolean,
        default: false,
      },
      refChart: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        oldTheme: ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
      })
    },
    computed: {
      getChartOptions() {
        const darkColor = this.$colors.grey.darken3;
        const lightColor = this.$colors.shades.white;
        const backgroundColor = {backgroundColor: this.theme === 'dark' ? darkColor : lightColor};
        // Run the method only when changing the schema
        this.runGetRefChart();
        return Object.assign({}, backgroundColor, this.options, {dataset: {source: this.data}});
      },
    },
    methods: {
      runGetRefChart(){
        // Run the method only when changing the theme
        if(this.refChart && (this.theme !== this.oldTheme)){
          setTimeout(() => {
            this.getRefChart();
            this.oldTheme = this.theme;
          }, 1000);
        }
      },
      getRefChart() {
        const refChartComp = this.$refs[this.refChart] ? this.$refs[this.refChart] : null;
        if (refChartComp){
          const ref = {ref: this.refChart, comp: refChartComp};
          this.$emit('onRefChart', ref);
          if(isLog) debug('methods.getRefChart.ref:', ref);
        }
      },
    }

  };
</script>


