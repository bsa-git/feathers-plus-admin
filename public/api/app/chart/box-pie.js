export default {
  legend: {
    show: true,
    // orient: 'vertical',
    // left: 10,
    bottom: '2%'
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
            fontSize: '20',
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
