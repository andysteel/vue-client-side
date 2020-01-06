import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontawesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faUserPlus,
  faSignInAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faUserPlus,
  faSignInAlt,
  faHome
)

Vue.component('font-awesome-icon', FontawesomeIcon)
Vue.component('validation-provider', ValidationProvider)

Vue.config.productionTip = false

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: "App",
  components: {
    FontawesomeIcon : 'font-awesome-icon'
  }
};

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
