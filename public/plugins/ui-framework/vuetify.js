import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';


export default ({app}) => {
  const config = {
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    },
    theme: {
      primary: colors.indigo.base,
      secondary: colors.indigo.lighten4,
      accent: colors.indigo.base,
    },
    options: {
      themeVariations: ['primary', 'secondary', 'accent'],
      extra: {
        mainToolbar: {
          color: 'primary',
        },
        sideToolbar: {},
        sideNav: 'primary',
        mainNav: 'primary lighten-1',
        bodyBg: '',
        pageBg: colors.grey['lighten-5']
      }
    }
  };

  Vue.use(Vuetify, config);
};
