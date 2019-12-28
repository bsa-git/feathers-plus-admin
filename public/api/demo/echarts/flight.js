export default {
  title: {
    text: 'World Flights',
    left: 'center',
    textStyle: {
      color: '#eee'
    }
  },
  backgroundColor: '#003',
  tooltip: {
    formatter: null
  },
  geo: {
    map: 'world',
    left: 0,
    right: 0,
    silent: true,
    itemStyle: {
      normal: {
        borderColor: '#003',
        color: '#005'
      }
    }
  },
  series: [
    {
      type: 'lines',
      coordinateSystem: 'geo',
      data: null,
      large: true,
      largeThreshold: 100,
      lineStyle: {
        normal: {
          opacity: 0.05,
          width: 0.5,
          curveness: 0.3
        }
      },
      // Set the blending mode to overlay
      blendMode: 'lighter'
    }
  ]
};
