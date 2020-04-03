<template>
  <v-card
    :color="getTheme.dark? 'secondary' : ''"
    :dark="getTheme.dark? true : false"
    :outlined="outlined"
  >
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <v-row class="ma-0">
          <v-col cols="6" class="d-flex flex-column justify-center align-center ma-0">
            <div class="subheading pb-2" :class="theme === 'dark'? 'white--text' : 'black--text' ">{{ title }}</div>
            <div><span class="grey--text">{{subTitle}} <v-icon small :color="iconColor">{{icon}}</v-icon></span></div>
          </v-col>
          <v-col cols="6" class="d-flex flex-column justify-center align-center py-3">
            <div>
              <chart
                :height="height"
                width="100%"
                :theme="theme"
                :options="getChartOptions"
                :ref="refChart"
                autoresize
              />
            </div>
            <!-- More Info Button -->
            <div v-if="isMore">
              <v-btn @click="clickMoreDetails" text icon :title="$t('chartDemo.more') + '...'">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ECharts from '~/components/chart/ECharts'

  const debug = require('debug')('app:comp.MiniChart');
  const isLog = true;

  export default {
    components: {
      chart: ECharts
    },
    props: {
      title: String,
      subTitle: String,
      alias: String,
      theme: String,
      options: Object,
      data: Array,
      icon: String,
      height: {
        type: String,
        default: '68px',
      },
      iconColor: {
        type: String,
        default: 'success',
      },
      isMore: {
        type: Boolean,
        default: true,
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
      ...mapGetters({
        getTheme: 'getTheme',
      }),
      getChartOptions() {
        const darkColor = this.$colors.grey.darken3;
        const lightColor = this.$colors.shades.white;
        const backgroundColor = {backgroundColor: this.theme === 'dark' ? darkColor : lightColor};
        return Object.assign({}, backgroundColor, this.options, {dataset: {source: this.data}});
      },
    },
    methods: {
      clickMoreDetails() {
        this.$emit('onMoreDetails', this.alias)
      },
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


