import Vue from 'vue'
import App from './app.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '920643452470-gj7cndf3bql0mm7vsloo1jomfspke9cf.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue ({
    render: h => h(App),
}).$mount('#app')