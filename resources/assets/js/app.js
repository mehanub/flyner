
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
const VueGoogleMaps = require('vue2-google-maps');
 
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css';
import Vuetify from 'vuetify';
 Vue.use(Vuetify);
Vue.use(MuseUI);
import 'vuetify/dist/vuetify.min.css' 
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('example', require('./components/Example.vue'));
Vue.component('mapper', require('./components/Map.vue'));


 Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBsZpmjeo2mhkWXOYpwa86DDr7SFCsDAL0',
    v: '3.26',
    libraries: 'places'
  }
})


const app = new Vue({
    el: '#app'
});
