const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);

const shortMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const monthVisitData = shortMonth.map(m => {
  return {
    'month': m,
    'Unique Visit': Math.floor(Math.random() * 1000) + 200,
    'Page View': Math.floor(Math.random() * 1000) + 250,
  };
});

// e.g. [['month', 'Unique Visit'],
//       ['Jan', 120],
//       ...
//       ['Dec', 133]]
const monthUniqueVisitData = () => {
  let data = shortMonth.map(m => {
    return [m, Math.floor(Math.random() * 1000) + 200];
  });
  data.unshift(['month', 'Unique Visit']);
  let value = `${Math.floor(Math.random() * 100)}%`;
  // return {data: data, value: value};
  return {data, value};
};


// e.g. [['month', 'Page View'],
//       ['Jan', 220],
//       ...
//       ['Dec', 233]]
const dayPageViewData = () => {
  let data = shortDays.map(m => {
    return [m, Math.floor(Math.random() * 1000) + 250];
  });
  data.unshift(['day', 'Page View']);
  let value = `${Math.floor(Math.random() * 100)}%`;
  return {data, value};
};


const campaignData = [
  {
    value: 335,
    name: 'Website'
  },
  {
    value: 310,
    name: 'Email'
  },
  {
    value: 234,
    name: 'Ads'
  },
  {
    value: 135,
    name: 'Video'
  },
  {
    value: 1548,
    name: 'Search'
  }
];
const locationData = [
  {
    value: 50,
    name: 'China'
  },
  {
    value: 35,
    name: 'USA'
  },
  {
    value: 25,
    name: 'EU'
  },
  {
    value: 10,
    name: 'Russia'
  },
  {
    value: 10,
    name: 'Other'
  }
];

const StackMainData = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
const StackData = StackMainData.map((item, index) => {
  return {
    'label': shortMonth[index],
    'max': 500,
    'sales': item,
  };
});

// e.g. [{month: 'Jan', sales: 55, max: 100},
//       ...
//       {month: 'Dec', sales: 93, max: 100}]
const monthSalesData = () => {
  let data = shortMonth.map(m => {
    return {
      month: m,
      max: 100,
      sales: Math.floor(Math.random() * 100),
    };
  });
  let dimensions = ['month', 'max', 'sales'];
  let value = `${Math.floor(Math.random() * 100)}%`;
  return {dimensions, data, value};
};

const productCostData = () => {
  const random = () => {
    return Math.floor(Math.random() * 100);
  };
  let products = ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'];
  let data = products.map(p => {
    return [p, random(), random(), random(), random(), random(), random()];
  });
  data.unshift(['product', '2012', '2013', '2014', '2015', '2016', '2017']);
  let value = `${Math.floor(Math.random() * 100)}%`;
  return {data, value};
};

const productCostData2 = () => {
  const random = () => {
    return Math.floor(Math.random() * 100);
  };
  let products = ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa'];
  let data = products.map(p => {
    return [p, random(), random(), random(), random()];
  });
  data.unshift(['product', '2012', '2013', '2014', '2015']);
  let value = `${Math.floor(Math.random() * 100)}%`;
  return {data, value};
};


const SinData = range(1, 12).map(i => {
  return {
    'cate': 'Cat' + i,
    'value': ((Math.sin(i / 5) * (i / 5 - 0.1) + i / 6) * 5)
  };
});


export {
  monthVisitData,
  monthUniqueVisitData,
  monthSalesData,
  dayPageViewData,
  productCostData,
  productCostData2,
  campaignData,
  locationData,
  StackData,
  SinData,
};
