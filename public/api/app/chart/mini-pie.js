export default {
  legend: {
    show: false
  },
  tooltip: {
    trigger: 'item',
    formatter: '{c} ({d}%)'
  },
  dataset: {
    // Provide data.
    source: null
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '10',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
    }
  ]
};
