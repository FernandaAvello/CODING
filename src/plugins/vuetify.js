import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#292929',
        accent: '#00ff75'
      },
      dark: {
        primary: '#292929',
        accent: '#00ff75'
      }
    }
  },
  lang: {
    locales: { es },
    current: 'es',
  }
})
