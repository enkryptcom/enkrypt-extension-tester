// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          background: '#f9fafb',
          surface: '#FFFFFF',
          primary: '#474747',
          secondary: '#7987a1',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          blue: '#0c1427',
          'blue-lighten-1': '#ebf3ff',
          green: '#05c0a5',
          btn: '#14254d'
        }
      }
    }
  }
});
