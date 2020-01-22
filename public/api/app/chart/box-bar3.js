export default {
  legend: {},
  tooltip: {},
  dataset: {
    source: null
  },
  xAxis: [
    {type: 'category', gridIndex: 0},
    {type: 'category', gridIndex: 1}
  ],
  yAxis: [
    {gridIndex: 0},
    {gridIndex: 1}
  ],
  grid: [
    {bottom: '55%'},
    {top: '55%'}
  ],
  series: [
    // These series are in the first grid.
    {type: 'bar', seriesLayoutBy: 'row'},
    {type: 'bar', seriesLayoutBy: 'row'},
    {type: 'bar', seriesLayoutBy: 'row'},
    // These series are in the second grid.
    {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
  ]
};
