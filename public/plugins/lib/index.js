import HttpBox from './http.client.class';
import Avatar from './avatar.class';
import LocationHelper from './location-helper.class';
import syncStore from './sync-store';
import util from './util';
import typeOf from './type-of';

export default Object.assign({},
  {
    LocationHelper,
    HttpBox,
    Avatar,
  },
  syncStore,
  util,
  typeOf,
);
