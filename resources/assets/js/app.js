
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
//const VueGoogleMaps = require('vue2-google-maps');
import * as VueGoogleMaps from "vue2-google-maps";
 
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css';

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify';
 
 Vue.use(Vuetify);
Vue.use(MuseUI);
 
  Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBsZpmjeo2mhkWXOYpwa86DDr7SFCsDAL0', 
    
    libraries: "places,geometry"
  }
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('app', require('./components/App.vue'));
Vue.component('mapper', require('./components/Map.vue'));
Vue.component('maptoolbar', require('./components/Map/mapToolbar.vue'));
Vue.component('markerInfo', require('./components/Map/markerInfo.vue'));
Vue.component('shape', require('./components/Map/marker.vue'));
Vue.component('projectToolbar', require('./components/Project/projectTool.vue'));
Vue.component('layer', require('./components/Project/Layer.vue'));



 Object.defineProperty(Vue.prototype,"$bus",{
	get: function() {
		return this.$root.bus;
	}
});

Vue.mixin({
  methods:{
    testMix(){
      console.log (app)
    },
    getRandomId :function() {
          return (Math.floor(Math.random()*1234567890)).toString();
      },
   getIndex: function(arr,val){
      for (var i = 0; i < arr.length; i++){
         if (arr[i].id == val) {return i};
        }
      },
  }
})

 

const app = new Vue({
     el: '#app',
   data:{
   		 bus: new Vue({}), // Here we bind our event bus to our $root Vue model.
       test: 'test',
   },
});
