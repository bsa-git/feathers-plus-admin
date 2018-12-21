import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';



export default ({ app }) => {
  Vue.use(Vuetify, {
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    },
    theme: {
      primary: colors.indigo.base, // #E53935
      secondary: colors.indigo.lighten4, // #FFCDD2
      accent: colors.indigo.base // #3F51B5
    },
    options: {
      themeVariations: ['primary', 'secondary', 'accent'],
      extra: {
        mainToolbar: {
          color: 'primary',
        },
        sideToolbar: {
        },
        sideNav: 'primary',
        mainNav: 'primary lighten-1',
        bodyBg: '',
        pageBg: colors.grey['lighten-5']
      }
    }
  });
};
