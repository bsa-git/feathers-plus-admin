import Vue from 'vue';
import VeeValidate from 'vee-validate';
// import VueI18n from 'vue-i18n';
import ruValidate from 'vee-validate/dist/locale/ru';
import enValidate from 'vee-validate/dist/locale/en';
// import enLocale from '~/plugins/localization/messages-en';
// import ruLocale from '~/plugins/localization/messages-ru';


// Ready translated locale messages
// const locales = {
//   en: enLocale,
//   ru: ruLocale
// };

// Vue.use(VueI18n);

// const i18n = new VueI18n();
// Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: 'en', // set locale
//   messages: locales, // set locale messages
// });

// Add dictionary
const dictionary = {
  ru: { messages: ruValidate.messages, attributes: ruValidate.attributes },
  en: { messages: enValidate.messages, attributes: enValidate.attributes }
};

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: dictionary,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',// ru|en
  validity: false
};

Vue.use(VeeValidate, config);
