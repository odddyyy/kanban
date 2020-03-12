import Vue from 'vue'
import App from './app.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue ({
    render: h => h(App),
}).$mount('#app')