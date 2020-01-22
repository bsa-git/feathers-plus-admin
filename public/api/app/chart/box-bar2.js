import { graphic } from 'echarts/lib/export';

export default {
  legend: {
    show: false
  },
  tooltip: {},
  dataset: {
    // Provide data.
    dimensions: null,
    source: null
  },
  xAxis: {
    // data: null,
    type: 'category',
    axisLabel: {
      inside: false,
      textStyle: {
        color: '#999'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#999'
      }
    }
  },
  series: [
    { // For shadow
      type: 'bar',
      itemStyle: {
        color: 'rgba(0,0,0,0.05)'
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      // data: null,
      animation: false
    },
    {
      type: 'bar',
      itemStyle: {
        color: new graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {offset: 0, color: '#83bff6'},
            {offset: 0.5, color: '#188df0'},
            {offset: 1, color: '#188df0'}
          ]
        )
      },
      emphasis: {
        itemStyle: {
          color: new graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#2378f7'},
              {offset: 0.7, color: '#2378f7'},
              {offset: 1, color: '#83bff6'}
            ]
          )
        }
      },
      // data: data
    }
  ]
};
