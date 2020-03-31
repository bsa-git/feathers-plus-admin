<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Box charts dialog ===-->
    <view-dialog
      :dialog="boxChartDialog"
      :max-width="500"
      :is-text-content="false"
      header-icon="mdi-menu"
      :header-title="$t('app_menu.chartDemo')"
      :action-text="$t('management.close')"
      v-on:onClose="boxChartDialog = false; aliasBoxChart = ''"
    >
      <div slot="card-content">
        <box-chart
          v-if="aliasBoxChart === 'monthlySales'"
          title="Monthly Sales"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="boxBarOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          :outlined="true"
        />
        <box-chart
          v-else-if="aliasBoxChart === 'pageView'"
          title="Page View"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="boxLineOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          :outlined="true"
        />
        <box-chart
          v-else-if="aliasBoxChart === 'dailySalesTrend'"
          title="Daily Sales Trend"
          :sub-title="dataset.dayPageView.value"
          icon="mdi-chart-line-variant"
          :options="boxPieOptions"
          :data="dataset.dayPageView.data"
          :theme="theme.dark? 'dark' : 'shine'"
          :outlined="true"
        />
        <box-chart
          v-else-if="aliasBoxChart === 'monthlySalesTrend'"
          title="Monthly Sales Trend"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="boxAreaLineOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          :outlined="true"
        />
      </div>
    </view-dialog>

    <!--=== Mini Statistic ===-->
    <v-row justify="center">
      <v-col cols="12">
        <div class="text-center">
          <v-btn-toggle class="" v-model="realTime"
                        :title="`${$t('echartDemo.value')}: ${realTime === 'start'? $t('echartDemo.start') : $t('echartDemo.stop')}`">
            <v-btn value="start">
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn value="stop" min-width="100">
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col cols="12">
        <h4>Mini Charts</h4>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-chart
          title="Monthly Sales"
          alias="monthlySales"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="miniBarOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          v-on:onMoreDetails="aliasBoxChart = $event"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-chart
          title="Page View"
          alias="pageView"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="miniLineOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          v-on:onMoreDetails="aliasBoxChart = $event"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-chart
          title="Daily Sales Trend"
          alias="dailySalesTrend"
          :sub-title="dataset.dayPageView.value"
          icon="mdi-chart-line-variant"
          :options="miniPieOptions"
          :data="dataset.dayPageView.data"
          :theme="theme.dark? 'dark' : 'shine'"
          v-on:onMoreDetails="aliasBoxChart = $event"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-chart
          title="Monthly Sales Trend"
          alias="monthlySalesTrend"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="miniAreaLineOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
          v-on:onMoreDetails="aliasBoxChart = $event"
        />
      </v-col>
    </v-row>
    <!--=== Box Statistic ===-->
    <v-row justify="center">
      <v-col cols="12">
        <h4>Box Charts</h4>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <box-chart
          title="Monthly Sales"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="boxBarOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <box-chart
          title="Page View"
          :sub-title="dataset.monthUniqueVisit.value"
          icon="mdi-chart-line-variant"
          :options="boxLineOptions"
          :data="dataset.monthUniqueVisit.data"
          :theme="theme.dark? 'dark' : 'shine'"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <box-chart
          title="Daily Sales Trend"
          :sub-title="dataset.dayPageView.value"
          icon="mdi-chart-line-variant"
          :options="boxPieOptions"
          :data="dataset.dayPageView.data"
          :theme="theme.dark? 'dark' : 'shine'"
        />
      </v-col>
    </v-row>
    <!--=== Complex Statistic ===-->
    <v-row justify="center">
      <v-col cols="12">
        <h4>Complex Charts</h4>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card outlined>
          <box-chart
            title="Monthly Sales"
            :sub-title="dataset.monthSales.value"
            icon="mdi-chart-line-variant"
            :options="getBoxBar2Options"
            :data="dataset.monthSales.data"
            :theme="theme.dark? 'dark' : 'vintage'"
            :outlined="true"
          />
          <mini-chart
            title="Daily Sales Trend"
            alias="dailySalesTrend"
            :sub-title="dataset.dayPageView.value"
            icon="mdi-chart-line-variant"
            :options="miniPieOptions"
            :data="dataset.dayPageView.data"
            :theme="theme.dark? 'dark' : 'shine'"
            :is-more="false"
            :outlined="true"
          />
          <v-card-actions>
            <v-spacer/>
            <v-btn
              v-if="realTime === 'stop'"
              text
              color="primary"
              @click="clickRealTime('start')"
            >
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn
              v-else
              text
              color="primary"
              @click="clickRealTime('stop')"
            >
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card outlined>
          <box-chart
            title="Page View"
            :sub-title="dataset.monthUniqueVisit.value"
            icon="mdi-chart-line-variant"
            :options="boxLineOptions"
            :data="dataset.monthUniqueVisit.data"
            :theme="theme.dark? 'dark' : 'shine'"
            :outlined="true"
          />
          <mini-chart
            title="Daily Sales Trend"
            alias="dailySalesTrend"
            :sub-title="dataset.dayPageView.value"
            icon="mdi-chart-line-variant"
            :options="miniPieOptions"
            :data="dataset.dayPageView.data"
            :theme="theme.dark? 'dark' : 'shine'"
            :is-more="false"
            :outlined="true"
          />
          <v-card-actions>
            <v-spacer/>
            <v-btn
              v-if="realTime === 'stop'"
              text
              color="primary"
              @click="clickRealTime('start')"
            >
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn
              v-else
              text
              color="primary"
              @click="clickRealTime('stop')"
            >
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card outlined>
          <box-chart
            title="Daily Sales Trend"
            :sub-title="dataset.dayPageView.value"
            icon="mdi-chart-line-variant"
            :options="boxAreaLineOptions"
            :data="dataset.dayPageView.data"
            :theme="theme.dark? 'dark' : 'shine'"
            :outlined="true"
          />
          <mini-chart
            title="Daily Page View"
            alias="dailySalesTrend"
            :sub-title="dataset.dayPageView.value"
            icon="mdi-chart-line-variant"
            :options="miniPieOptions"
            :data="dataset.dayPageView.data"
            :theme="theme.dark? 'dark' : 'shine'"
            :is-more="false"
            :outlined="true"
          />
          <v-card-actions>
            <v-spacer/>
            <v-btn
              v-if="realTime === 'stop'"
              text
              color="primary"
              @click="clickRealTime('start')"
            >
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn
              v-else
              text
              color="primary"
              @click="clickRealTime('stop')"
            >
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!--=== Analytics Statistic ===-->
    <v-row justify="center">
      <v-col cols="12">
        <h4>Chart Analytics</h4>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-widget
          title="Analytic statistics"
          headerIcon="mdi-chart-bar"
        >
          <div slot="widget-header-action">
            <v-btn
              v-if="realTime === 'stop'"
              text
              @click="clickRealTime('start')"
            >
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn
              v-else
              text
              @click="clickRealTime('stop')"
            >
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </div>
          <div slot="widget-content">
            <box-chart
              height="500px"
              title="Product cost"
              :sub-title="dataset.productCost2.value"
              icon="mdi-chart-line-variant"
              :options="boxBar3Options"
              :data="dataset.productCost2.data"
              :theme="theme.dark? 'dark' : 'vintage'"
              :outlined="true"
            />
          </div>
        </v-widget>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-widget
          title="Analytic statistics"
          headerIcon="mdi-chart-pie"
        >
          <div slot="widget-header-action">
            <v-btn
              v-if="realTime === 'stop'"
              text
              @click="clickRealTime('start')"
            >
              {{ $t('echartDemo.start') }}
            </v-btn>
            <v-btn
              v-else
              text
              @click="clickRealTime('stop')"
            >
              {{ $t('echartDemo.stop') }}
            </v-btn>
          </div>
          <div slot="widget-content">
            <box-chart
              height="500px"
              title="Annual product cost"
              :sub-title="dataset.productCost.value"
              icon="mdi-chart-line-variant"
              :options="getBoxAndLinesOptions"
              :data="dataset.productCost.data"
              :theme="theme.dark? 'dark' : 'vintage'"
              :outlined="true"
              ref-chart="barAndLines"
              v-on:onRefChart="getRefCharts($event)"
            />
          </div>
        </v-widget>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import MiniChart from '~/components/widgets/chart/MiniChart';
  import BoxChart from '~/components/widgets/chart/BoxChart';
  import VWidget from '~/components/widgets/VWidget';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import {
    StackData,
    SinData,
    monthVisitData,
    monthUniqueVisitData,
    monthSalesData,
    productCostData,
    productCostData2,
    dayPageViewData,
    campaignData,
    locationData,
  } from '~/api/demo/chart/chart-data';


  import miniBarOptions from '~/api/app/chart/mini-bar'
  import miniLineOptions from '~/api/app/chart/mini-line'
  import miniAreaLineOptions from '~/api/app/chart/mini-area-line'
  import miniPieOptions from '~/api/app/chart/mini-pie'
  import boxBarOptions from '~/api/app/chart/box-bar'
  import boxBar2Options from '~/api/app/chart/box-bar2'
  import boxBar3Options from '~/api/app/chart/box-bar3'
  import boxLineOptions from '~/api/app/chart/box-line'
  import boxPieOptions from '~/api/app/chart/box-pie'
  import boxAreaLineOptions from '~/api/app/chart/box-area-line'
  import barAndLinesOptions from '~/api/app/chart/bar-and-lines'

  const debug = require('debug')('app:page.chart');
  const isLog = true;
  const isDebug = false;

  export default {
    components: {
      AppPageHeader,
      MiniChart,
      BoxChart,
      ViewDialog,
      VWidget
    },
    data() {
      return {
        title: this.$t('chartDemo.title'),
        description: this.$t('chartDemo.description'),
        boxChartDialog: false,
        aliasBoxChart: '',
        seconds: -1,
        realTime: '',
        startTimer1: null,
        startTimer2: null,
        startTimer3: null,
        startTimer4: null,
        startTimer5: null,
        dataset: {
          sinData: SinData,
          monthVisit: monthVisitData,
          monthUniqueVisit: monthUniqueVisitData(),
          monthSales: monthSalesData(),
          dayPageView: dayPageViewData(),
          productCost: productCostData(),
          productCost2: productCostData2(),
          campaign: campaignData,
          location: locationData,
          stackData: StackData,
        },
        barAndLinesChart: null,

        miniBarOptions,
        miniLineOptions,
        miniPieOptions,
        miniAreaLineOptions,
        boxBarOptions,
        boxBar2Options,
        boxBar3Options,
        boxLineOptions,
        boxPieOptions,
        boxAreaLineOptions,
        barAndLinesOptions
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.realTime = 'stop';
      })
    },
    watch: {
      realTime: {
        handler(value) {
          const isStart = value === 'start';
          const isStop = value === 'stop';
          if (isStart) {
            this.startMonthUniqueVisit();
            this.startDayPageView(2000);
            this.startMonthSales(3000);
            this.startProductCost(3000);
            this.startProductCost2(3000);
          }
          if (isStop) {
            if (this.startTimer1) {
              clearTimeout(this.startTimer1);
            }
            if (this.startTimer2) {
              clearTimeout(this.startTimer2);
            }
            if (this.startTimer3) {
              clearTimeout(this.startTimer3);
            }
            if (this.startTimer4) {
              clearTimeout(this.startTimer4);
            }
            if (this.startTimer5) {
              clearTimeout(this.startTimer5);
            }
          }
        },
        immediate: true
      },
      aliasBoxChart: {
        handler(value) {
          if (isLog && value) debug('watch.aliasBoxChart:', value);
          this.boxChartDialog = !!value;
        },
        immediate: true
      },
    },
    computed: {
      getBoxBar2Options: function () {
        this.boxBar2Options.dataset.dimensions = this.dataset.monthSales.dimensions;
        return this.boxBar2Options
      },
      getBoxAndLinesOptions: function () {
        let pieSeries = barAndLinesOptions.series[4];
        pieSeries.label.formatter = '{b}: {@2012} ({d}%)';
        pieSeries.encode.itemName = 'product';
        pieSeries.encode.value = '2012';
        pieSeries.encode.tooltip = '2012';
        return this.barAndLinesOptions
      },
      ...mapGetters({
        theme: 'getTheme',
        primaryColor: 'getPrimaryBaseColor',
      }),
    },
    methods: {
      startMonthUniqueVisit(period = 1000) {
        this.startTimer1 = setInterval(() => {
          this.dataset.monthUniqueVisit = monthUniqueVisitData();
        }, period)
      },
      startDayPageView(period = 1000) {
        this.startTimer2 = setInterval(() => {
          this.dataset.dayPageView = dayPageViewData();
        }, period)
      },
      startMonthSales(period = 1000) {
        this.startTimer3 = setInterval(() => {
          this.dataset.monthSales = monthSalesData();
        }, period)
      },
      startProductCost(period = 1000) {
        this.startTimer4 = setInterval(() => {
          this.dataset.productCost = productCostData();
        }, period)
      },
      startProductCost2(period = 1000) {
        this.startTimer5 = setInterval(() => {
          this.dataset.productCost2 = productCostData2();
        }, period)
      },
      clickRealTime(action) {
        this.realTime = action;
      },
      getRefCharts(refComp) {
        const self = this;
//        if (isLog) debug('methods.getRefCharts.refComp:', refComp);
        if (refComp.ref === 'barAndLines') {
          this.barAndLinesChart = refComp.comp;
          this.barAndLinesChart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
              const dimension = xAxisInfo.value + 1;
              self.barAndLinesChart.mergeOptions({
                series: {
                  id: 'pie',
                  label: {
                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                  },
                  encode: {
                    value: dimension,
                    tooltip: dimension
                  }
                }
              });
            }
          });
        }
      },
    }
  }
</script>
