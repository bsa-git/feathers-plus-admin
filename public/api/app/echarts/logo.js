const logo = require('~/static/xml/Svg-ECharts.xml');

let d = logo.svg.path[0].$.d;
export default {
  series: [
    {
      type: 'liquidFill',
      data: [0.7, 0.6, 0.55, 0.45],
      amplitude: 6,
      outline: {
        show: false
      },
      radius: '60%',
      color: ['#4fc08d', '#44d64a', '#33c762', '#4acc80'],
      backgroundStyle: {
        color: '#fff',
        borderColor: '#2c3e50',
        borderWidth: 1
      },
      shape: `path://${d}`,
      label: {
        normal: {
          formatter () {
            return '';
          }
        }
      }
    }
  ]
};
