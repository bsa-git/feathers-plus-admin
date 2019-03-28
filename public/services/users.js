import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';

const { service } = feathersVuex(feathersClient, { idField: '_id' });

const servicePath = 'users';
const servicePlugin = service(servicePath);

export default servicePlugin;
