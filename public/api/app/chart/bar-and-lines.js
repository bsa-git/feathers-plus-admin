export default {
  legend: {
    // bottom: 5,
    // padding: [20, 5]
  },
  tooltip: {
    trigger: 'axis',
    showContent: false
  },
  dataset: {
    source: null
  },
  xAxis: {type: 'category'},
  yAxis: {gridIndex: 0},
  grid: {top: '50%'},
  series: [
    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      label: {
        formatter: '{b}: {@2012} ({d}%)'
      },
      encode: {
        itemName: 'product',
        value: '2012',
        tooltip: '2012'
      }
    }
  ]
};
