export default {
  legend: {
    orient: 'horizontal',
    // bottom: 0,
    // padding: 5
  },
  tooltip: {},
  dataset: {
    // Provide data.
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  // Declare X axis, which is a category axis, mapping
  // to the first column by default.
  xAxis: { type: 'category' },
  // Declare Y axis, which is a value axis.
  yAxis: {},
  // Declare several series, each of them mapped to a
  // column of the dataset by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
