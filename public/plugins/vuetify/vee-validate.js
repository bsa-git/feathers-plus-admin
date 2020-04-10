import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';
import en from 'vee-validate/dist/locale/en';

// Add dictionary
const dictionary = {
  ru: { messages: ru.messages, attributes: ru.attributes },
  en: { messages: en.messages, attributes: en.attributes }
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
  locale: 'en',
  validity: false
};

export default ({ app }) => {
  config.i18n = app.i18n;
  config.locale = app.i18n.locale;
  Vue.use(VeeValidate, config);
};
