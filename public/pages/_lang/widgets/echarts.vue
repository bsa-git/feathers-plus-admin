<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== ECharts Logo ===-->
    <div class="d-flex justify-center mb-12">
      <a href="https://github.com/Justineo/vue-echarts" :title="$t('echartDemo.vueEChartsOnGithub')" target="_blank">
        <logo-chart
          :init-options="initOptions"
        ></logo-chart>
      </a>
    </div>

    <!--=== Bootons ===-->
    <panels-top-bar
      btn1-icon="mdi-plus"
      :btn1-tooltip="$t('accounts.allOpen')"
      btn2-icon="mdi-minus"
      :btn2-tooltip="$t('accounts.allClose')"
      :click-btn1="allOpen"
      :click-btn2="allClose"
    >
      <v-btn-toggle v-model="initOptions.renderer" :title="`${$t('echartDemo.value')}: ${initOptions.renderer}`">
        <v-btn value="canvas">
          {{ $t('echartDemo.canvas') }}
        </v-btn>
        <v-btn value="svg" min-width="100">
          {{ $t('echartDemo.svg') }}
        </v-btn>
      </v-btn-toggle>
    </panels-top-bar>

    <!--=== Map image dialog ===-->
    <view-dialog
      :dialog="imgMapDialog"
      :max-width="imgMap.width"
      :is-text-content="false"
      header-icon="mdi-image-move"
      :header-title="$t('echartDemo.mapConvertibleImage')"
      :action-text="$t('management.close')"
      v-on:onClose="imgMapDialog = false"
    >
      <div slot="card-content">
        <span v-if="!imgMap.src">{{ $t('management.noData') }}</span>
        <v-img
          v-else
          class="ma-0"
          :src="imgMap.src"
          :width="imgMap.width"
          :height="imgMap.height"
        ></v-img>
      </div>
    </view-dialog>

    <!--=== Expansion panels ===-->
    <v-expansion-panels
      v-model="panels"
      focusable
      multiple
      inset
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
        :ref="`panel${i+1}`"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-baseline">
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
            <span>{{ item.name }}</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Expansion panel Bar -->
          <v-row justify="center" v-if="item.panel === 'bar'">
            <v-col cols="12" md="8">
              <!-- Bar Chart -->
              <v-card
                :color="theme.dark? '#333' : '#FFFFFF'"
              >
                <v-card-text>
                  <chart
                    :options="getBarOptions"
                    :init-options="initOptions"
                    ref="bar"
                    :theme="theme.dark? 'dark' : 'olivia-green'"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Refresh Button -->
                  <v-btn
                    :loading="seconds > 1"
                    :disabled="seconds > 1"
                    color="primary"
                    class="ma-2"
                    @click="refreshBar"
                  >
                    {{ $t('echartDemo.refresh') }}
                    <v-icon right dark>mdi-refresh</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Pie -->
          <v-row justify="center" v-if="item.panel === 'pie'">
            <v-col cols="12" md="8">
              <!-- Pie Chart -->
              <v-card
                :color="theme.dark? '#333' : '#fef8ef'"
              >
                <v-card-text>
                  <chart
                    :options="getPieOptions"
                    :init-options="initOptions"
                    ref="pie"
                    :theme="theme.dark? 'dark' : 'vintage'"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Start/Stop Buttons -->
                  <v-btn
                    v-if="pieStartTimer"
                    color="primary"
                    @click="stopPieDispatchAction"
                  >
                    {{ $t('echartDemo.stop') }}
                    <v-icon right dark>mdi-pause</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    color="primary"
                    @click="startPieDispatchAction"
                  >
                    {{ $t('echartDemo.start') }}
                    <v-icon right dark>mdi-play</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Polar -->
          <v-row justify="center" v-if="item.panel === 'polar'">
            <v-col cols="12" md="8">
              <!-- Polar Chart -->
              <v-card
                :color="theme.dark? '#333' : '#fef8ef'"
              >
                <v-card-text>
                  <chart
                    :options="getPolarOptions"
                    :init-options="initOptions"
                    ref="polar"
                    :theme="theme.dark? 'dark' : 'vintage'"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Scatter -->
          <v-row justify="center" v-if="item.panel === 'scatter'">
            <v-col cols="12" md="8">
              <!-- Scatter Chart -->
              <v-card
                :color="theme.dark? '#333' : '#fef8ef'"
              >
                <v-card-text>
                  <chart
                    :options="getScatterOptions"
                    :init-options="initOptions"
                    ref="scatter"
                    :theme="theme.dark? 'dark' : 'vintage'"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Map -->
          <v-row justify="center" v-if="item.panel === 'map'">
            <v-col cols="12" md="8">
              <!-- Map Chart -->
              <v-card
                :color="theme.dark? '#404a59' : '#404a59'"
              >
                <v-card-text>
                  <chart
                    :options="getMapOptions"
                    :init-options="initOptions"
                    ref="map"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="convertMapToImage"
                  >
                    {{ $t('echartDemo.convertToImage') }}
                    <v-icon right dark>mdi-image-move</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Radar -->
          <v-row justify="center" v-if="item.panel === 'radar'">
            <v-col cols="12" md="8">
              <!-- Radar Chart -->
              <v-card
                :color="theme.dark? '#333' : '#fef8ef'"
              >
                <v-card-text>
                  <chart
                    :options="getRadarOptions"
                    :init-options="initOptions"
                    ref="radar"
                    :theme="theme.dark? 'dark' : 'vintage'"
                    autoresize
                  />
                </v-card-text>
                <v-row align="baseline">
                  <v-col cols="8" md="4">
                    <!-- Select radar metric index -->
                    <v-select
                      class="ml-3"
                      v-model="radarMetricIndex"
                      :items="radarDataMetrics"
                      :label="$t('echartDemo.selectRadarNodalPoint')"
                      item-text="name"
                      item-value="index"
                    ></v-select>
                  </v-col>
                  <v-col cols="8" md="4">
                    <!-- Async switch -->
                    <v-switch
                      color="primary"
                      v-model="radarAsyncCount"
                      :label="`${$t('echartDemo.async')}: ${radarAsyncCount.toString()}`"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Increase/Decrease Buttons -->
                  <v-btn
                    color="primary"
                    @click="changeRadarData(1)"
                  >
                    {{ $t('echartDemo.increase') }}
                    <v-icon right dark>mdi-chevron-up</v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="changeRadarData(-1)"
                  >
                    {{ $t('echartDemo.decrease') }}
                    <v-icon right dark>mdi-chevron-down</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- Expansion panel Scatter with connect -->
          <v-row justify="center" v-if="item.panel === 'connect'">
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="6">
                  <!-- Scatter Chart1 -->
                  <v-card
                    :color="theme.dark? '#333' : '#fef8ef'"
                  >
                    <v-card-text>
                      <chart
                        :options="getC1Options"
                        :init-options="initOptions"
                        group="radiance"
                        ref="c1"
                        :theme="theme.dark? 'dark' : 'vintage'"
                        autoresize
                      />
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <!-- Scatter Chart2 -->
                  <v-card
                    :color="theme.dark? '#333' : '#fef8ef'"
                  >
                    <v-card-text>
                      <chart
                        :options="getC2Options"
                        :init-options="initOptions"
                        group="radiance"
                        ref="c2"
                        :theme="theme.dark? 'dark' : 'vintage'"
                        autoresize
                      />
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="auto">
              <!-- Connect switch -->
              <v-switch
                color="primary"
                v-model="chartsConnected"
                :label="chartsConnected? $t('echartDemo.connected') : $t('echartDemo.disconnected')"
              ></v-switch>
            </v-col>
          </v-row>
          <!-- Expansion panel Flight Map -->
          <v-row justify="center" v-if="item.panel === 'flight'">
            <v-col cols="12" md="8">
              <!-- Flight Map Chart -->
              <v-card
                :color="theme.dark? '#003' : '#003'"
              >
                <v-card-text>
                  <chart
                    :options="getFlightOptions"
                    :init-options="initOptions"
                    ref="flight"
                    autoresize
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="loadFlightData"
                  >
                    {{ $t('echartDemo.load') }}
                    <v-icon right dark>mdi-download</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import qs from 'qs'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import PanelsTopBar from '~/components/widgets/TopBars/TwoButtons';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import ECharts from '~/components/chart/ECharts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/map'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/chart/effectScatter'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/geo'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/visualMap'
  import 'echarts/lib/component/dataset'
  import 'echarts/map/js/world'
  import 'echarts/theme/vintage'
  import 'zrender/lib/svg/svg'

  // Map of China
  import chinaMap from '~/api/demo/echarts/china.json'
  // Theme Olivia Green
  import themeOliviaGreen from '~/api/app/echarts/olivia-green-theme.json'
  // ECharts Logo
  import LogoChart from '~/components/app/widgets/echarts/logo';
  // Options
  import barOptions from '~/api/demo/echarts/bar'
  import pieOptions from '~/api/demo/echarts/pie'
  import polarOptions from '~/api/demo/echarts/polar'
  import scatterOptions from '~/api/demo/echarts/scatter'
  import mapOptions from '~/api/demo/echarts/map'
  import radarOptions from '~/api/demo/echarts/radar'
  import { c1Options, c2Options } from '~/api/demo/echarts/connect'
  import flightOptions from '~/api/demo/echarts/flight'

//  import flightData from '~/api/demo/echarts/flight.json'
//  const flightData = require('~/api/demo/echarts/flight.json');

  const debug = require('debug')('app:page.echarts');
  const isLog = true;
  const isDebug = true;

  // Register theme
  ECharts.registerTheme('olivia-green', themeOliviaGreen);
  // registering map data
  ECharts.registerMap('china', chinaMap);

  export default {
    components: {
      AppPageHeader,
      PanelsTopBar,
      ViewDialog,
      LogoChart,
      chart: ECharts
    },
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true});
      return {
        title: this.$t('echartDemo.title'),
        description: this.$t('echartDemo.description'),
        panels: [0],
        seconds: -1,
        pieStartTimer: null,
        pieDataIndex: -1,
        radarMetricIndex: 0,
        radarAsyncCount: false,
        imgMapDialog: false,
        imgMap: {},
        chartsConnected: true,
        flightLoaded: false,
        flightData: null,
        items: [
          {
            panel: 'bar',
            name: this.$t('echartDemo.barTitle'),
            icon: 'mdi-chart-bar'
          },
          {
            panel: 'pie',
            name: this.$t('echartDemo.pieTitle'),
            icon: 'mdi-chart-pie'
          },
          {
            panel: 'polar',
            name: this.$t('echartDemo.polarTitle'),
            icon: 'mdi-chart-donut'
          },
          {
            panel: 'scatter',
            name: this.$t('echartDemo.scatterTitle'),
            icon: 'mdi-chart-scatter-plot'
          },
          {
            panel: 'map',
            name: this.$t('echartDemo.mapTitle'),
            icon: 'mdi-chart-bubble'
          },
          {
            panel: 'radar',
            name: this.$t('echartDemo.radarTitle'),
            icon: 'mdi-chart-donut-variant'
          },
          {
            panel: 'connect',
            name: this.$t('echartDemo.connectTitle'),
            icon: 'mdi-chart-scatter-plot-hexbin'
          },
          {
            panel: 'flight',
            name: this.$t('echartDemo.flightTitle'),
            icon: 'mdi-chart-multiline'
          },
        ],
        options,
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
        barChart: null,
        pieChart: null,
        polarChart: null,
        scatterChart: null,
        mapChart: null,
        radarChart: null,
        c1Chart: null,
        c2Chart: null,
        flightChart: null,
        barOptions,
        pieOptions,
        polarOptions,
        scatterOptions,
        mapOptions,
        radarOptions,
        c1Options,
        c2Options,
        flightOptions
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
    created: function () {
    },
    mounted: function () {
      this.$nextTick(function () {
        if (isLog) debug('mounted.$refs:', this.$refs);
        this.getRefCharts(this.panels);
      })
    },
    watch: {
      panels: function (val) {
        if (isLog) debug('watch.panels.$refs:', this.$refs);
        this.getRefCharts(val);
      },
      chartsConnected: {
        handler (value) {
          ECharts[value ? 'connect' : 'disconnect']('radiance')
        },
        immediate: true
      },
    },
    computed: {
      isMobile: function () {
        return this.$vuetify.breakpoint.xsOnly;
      },
      getBarOptions: function () {
        return this.barOptions;
      },
      getPieOptions: function () {
        this.pieOptions.title.text = this.$t('echartDemo.pieDescription');
        this.pieOptions.title.show = !this.isMobile;
        this.pieOptions.legend.left = this.isMobile ? 'center' : 'left';
        return this.pieOptions;
      },
      getPolarOptions: function () {
        this.polarOptions.title.text = this.$t('echartDemo.polarDescription');
        this.polarOptions.title.show = !this.isMobile;
        return this.polarOptions;
      },
      getScatterOptions: function () {
        const self = this;
        this.scatterOptions.title.text = this.$t('echartDemo.scatterDescription');
        this.scatterOptions.yAxis.name = this.$t('echartDemo.lifeExpectancy');
        this.scatterOptions.xAxis.name = this.$t('echartDemo.gdpOfCountries');
        this.scatterOptions.title.show = !this.isMobile;
        this.scatterOptions.tooltip.formatter = function (params) {
          const seriesName = params.seriesName;
          const data = params.data;
          if (isLog) debug('computed.getScatterOptions.data:', data);
          return `<b>${data[3]}, ${seriesName} ${self.$t('echartDemo.year')}</b><br/>${self.$t('echartDemo.gdp')}: ${data[0]}<br/>${self.$t('echartDemo.age')}: ${data[1]}<br/>${self.$t('echartDemo.population')}: ${data[2]}`;
        };
        return this.scatterOptions;
      },
      getMapOptions: function () {
        this.mapOptions.title.text = this.$t('echartDemo.mapDescription');
        this.mapOptions.title.show = !this.isMobile;
        return this.mapOptions;
      },
      getRadarOptions: function () {
        this.radarOptions.title.text = this.$t('echartDemo.radarDescription');
        this.radarOptions.title.show = !this.isMobile;
        this.radarOptions.radar.indicator = this.radarData.map(({ name, max }) => {
          return { name, max };
        });
        this.radarOptions.series[0].data = [{ value: this.radarData.map(({ value }) => value) }];
        return this.radarOptions;
      },
      radarDataMetrics() {
        let metrics = this.radarData.map((item, index) => {
          return {name: item.name, index: index};
        });
        this.$util.sortByStringField(metrics, 'name');
        return metrics
      },
      isRadarDataMax() {
        let {value, max} = this.radarData[this.radarMetricIndex];
        return value === max
      },
      isRadarDataMin() {
        return this.radarData[this.radarMetricIndex].value === 0
      },
      getC1Options: function () {
        return this.c1Options;
      },
      getC2Options: function () {
        return this.c2Options;
      },
      getFlightOptions: function () {
        const self = this;
        this.flightOptions.title.text = this.$t('echartDemo.flightDescription');

        function getAirportCoord (idx) {
          return [self.flightData.airports[idx][3], self.flightData.airports[idx][4]]
        }
        let routes = this.flightData? this.flightData.routes.map(function (airline) {
          return [
            getAirportCoord(airline[1]),
            getAirportCoord(airline[2])
          ]
        }) : null;
        if (isLog) debug('computed.getFlightOptions.routes:', routes);
        this.flightOptions.series[0].data = routes;
        this.flightOptions.tooltip.formatter = function (params) {
          let route = this.flightData? this.flightData.routes[params.dataIndex] : null;
          return route? this.flightData.airports[route[1]][1] + ' > ' + this.flightData.airports[route[2]][1] : null
        };
      },
      ...mapGetters({
        config: 'getConfig',
        theme: 'getTheme',
        primaryColor: 'getPrimaryBaseColor',
        radarData: 'getDemoRadarData'
      }),
      ...mapState(['echarts']),
    },
    methods: {
      // Open the panels
      allOpen() {
        this.items.forEach((item, i) => {
          if (!this.panels.includes(i)) {
            const panel = this.$refs[`panel${i + 1}`] ? this.$refs[`panel${i + 1}`][0] : null;
            if (panel && panel.toggle) {
              panel.toggle();
            }
          }
        })
      },
      // Close the panels
      allClose() {
        this.panels = []
      }
      ,
      randomizeBar() {
        return [0, 0, 0].map(() => {
          return Math.round(300 + Math.random() * 700) / 10;
        });
      }
      ,
      // Get ref charts
      getRefCharts(panels) {
        let found;
        if (panels.length) {
          if (!this.barChart) {
            found = panels.find(panel => this.items[panel].panel === 'bar');
            if (found !== undefined) {
              this.barChart = this.$refs.bar ? this.$refs.bar[0] : null;
              if (isLog) debug('methods.getRefCharts.barChart:', this.barChart);
            }
          }
          if (!this.pieChart) {
            found = panels.find(panel => this.items[panel].panel === 'pie');
            if (found !== undefined) {
              this.pieChart = this.$refs.pie ? this.$refs.pie[0] : null;
              if (isLog) debug('methods.getRefCharts.pieChart:', this.pieChart);
            }
          }
          if (!this.polarChart) {
            found = panels.find(panel => this.items[panel].panel === 'polar');
            if (found !== undefined) {
              this.polarChart = this.$refs.polar ? this.$refs.polar[0] : null;
              if (isLog) debug('methods.getRefCharts.polarChart:', this.polarChart);
            }
          }
          if (!this.scatterChart) {
            found = panels.find(panel => this.items[panel].panel === 'scatter');
            if (found !== undefined) {
              this.scatterChart = this.$refs.scatter ? this.$refs.scatter[0] : null;
              if (isLog) debug('methods.getRefCharts.scatterChart:', this.scatterChart);
            }
          }
          if (!this.mapChart) {
            found = panels.find(panel => this.items[panel].panel === 'map');
            if (found !== undefined) {
              this.mapChart = this.$refs.map ? this.$refs.map[0] : null;
              if (isLog) debug('methods.getRefCharts.mapChart:', this.mapChart);
            }
          }
          if (!this.radarChart) {
            found = panels.find(panel => this.items[panel].panel === 'radar');
            if (found !== undefined) {
              this.radarChart = this.$refs.radar ? this.$refs.radar[0] : null;
              if (isLog) debug('methods.getRefCharts.radarChart:', this.radarChart);
            }
          }
          if (!this.c1Chart) {
            found = panels.find(panel => this.items[panel].panel === 'connect');
            if (found !== undefined) {
              this.c1Chart = this.$refs.c1 ? this.$refs.c1[0] : null;
              if (isLog) debug('methods.getRefCharts.c1Chart:', this.c1Chart);
            }
          }
          if (!this.c2Chart) {
            found = panels.find(panel => this.items[panel].panel === 'connect');
            if (found !== undefined) {
              this.c2Chart = this.$refs.c2 ? this.$refs.c2[0] : null;
              if (isLog) debug('methods.getRefCharts.c2Chart:', this.c2Chart);
            }
          }
          if (!this.flightChart) {
            found = panels.find(panel => this.items[panel].panel === 'flight');
            if (found !== undefined) {
              this.flightChart = this.$refs.flight ? this.$refs.flight[0] : null;
              if (isLog) debug('methods.getRefCharts.flightChart:', this.flightChart);
            }
          }
        }
      }
      ,
      // Refresh bar chart
      refreshBar() {
        // simulating async data from server
        this.seconds = 3;
        if (!this.barChart) return;
        this.barChart.showLoading({
          text: `${this.$t('echartDemo.loading')}...`,
          color: this.primaryColor,
          textColor: this.theme.dark ? '#FFFFFF' : '#000000',
          maskColor: 'rgba(255, 255, 255, 0.4)'
        });
        let timer = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            clearTimeout(timer);
            this.barChart.hideLoading();
            this.refreshBarOptions();
            if (isLog) debug('methods.refreshBar.barOptions:', this.barOptions);
          }
        }, 1000)
      }
      ,
      refreshBarOptions: function () {
        const newDataset = [
          ['Product', '2015', '2016', '2017'],
          ['Matcha Latte', ...this.randomizeBar()],
          ['Milk Tea', ...this.randomizeBar()],
          ['Cheese Cocoa', ...this.randomizeBar()],
          ['Walnut Brownie', ...this.randomizeBar()]
        ];
        this.barOptions.dataset.source = newDataset;
      }
      ,
      startPieDispatchAction() {
        if (!this.pieChart) return;
        let dataLen = this.pieChart.options.series[0].data.length;

        this.pieStartTimer = setInterval(() => {
          this.pieChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.pieDataIndex
          });
          this.pieDataIndex = (this.pieDataIndex + 1) % dataLen;
          this.pieChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.pieDataIndex
          });
          // display tooltip
          this.pieChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.pieDataIndex
          })
        }, 1000)
      },
      stopPieDispatchAction() {
        clearTimeout(this.pieStartTimer);
        this.pieStartTimer = null;
        this.pieChart.dispatchAction({
          type: 'hideTip',
          seriesIndex: 0,
          dataIndex: this.pieDataIndex
        });
        this.pieChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.pieDataIndex
        });
      },
      convertMapToImage() {
        let map = this.mapChart;
        let {width, height} = map;
        this.imgMap = {
          src: map.getDataURL({
            pixelRatio: window.devicePixelRatio || 1
          }),
          width,
          height
        };
        if (isLog) debug('methods.convertMapToImage.imgMap:', this.imgMap);
        this.imgMapDialog = true
      },
      changeRadarData(amount) {
        if (isDebug) debug('methods.changeRadarData.radarMetricIndex:', this.radarMetricIndex);
        if (this.radarAsyncCount) {
          this.asyncIncrementRadarData({amount, index: this.radarMetricIndex, delay: 500});
        } else {
          this.incrementRadarData({amount, index: this.radarMetricIndex});
        }
      },
      async loadFlightData () {
        this.flightLoaded = true;

        this.flightChart.showLoading({
          text: `${this.$t('echartDemo.loading')}...`,
          color: '#c23531',
          textColor: 'rgba(255, 255, 255, 0.5)',
          maskColor: '#003',
//          text: `${this.$t('echartDemo.loading')}...`,
//          color: this.primaryColor,
//          textColor: this.theme.dark ? '#FFFFFF' : '#000000',
//          zlevel: 0
        });
//        import('~/api/demo/echarts/flight-data.json').then(({ default: data }) => {
//        import('../../../api/demo/echarts/flight-data.json').then(({ default: data }) => {
//          if (isLog) debug('methods.loadFlightData.data:', data);
//          this.flightChart.hideLoading();
//          this.flightData = data;
//        });
//        const { default: data } = await import('~/api/demo/echarts/flight-data.json');
        const { default: data } = await import('../../../api/demo/echarts/flight-data.json');
        this.flightChart.hideLoading();

        this.flightData = data;
        if (isLog) debug('methods.loadFlightData.data:', data);
      },
      ...mapMutations({
        incrementRadarData: 'INCREMENT_DEMO_RADAR_DATA',
      }),
      ...mapActions({
        asyncIncrementRadarData: 'asyncIncrementDemoRadarData'
      })
    }
  }
</script>
