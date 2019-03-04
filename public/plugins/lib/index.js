
import feathersClient from './feathers-client';
import feathersClientEs5 from './feathers-client-es5';
import HttpBox from './http.client.class';
import LocationHelper from './location-helper.class';
import syncStore from './sync-store';
import util from './util';
import typeOf from './type-of';

export default Object.assign({},
  {
    feathersClient,
    feathersClientEs5,
    LocationHelper,
    HttpBox,

  },
  syncStore,
  util,
  typeOf,
);
