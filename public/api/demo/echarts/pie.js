export default {
  title: {
    text: 'Pie chart example',
    x: 'right',
    show: true
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct interview', 'Email marketing', 'Affiliate advertising', 'Video advertising', 'Search engine']
  },
  series: [
    {
      name: 'VisitSource',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct interview' },
        { value: 310, name: 'Email marketing' },
        { value: 234, name: 'Affiliate advertising' },
        { value: 135, name: 'Video advertising' },
        { value: 1548, name: 'Search engine' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
