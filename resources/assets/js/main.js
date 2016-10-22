// Styles
require('styles/app.scss');
// Le Imports 
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// Config 
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', JsHacks.token_);

    next();
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */
import App from './App.vue'
import About from 'pages/About.vue'
import Achizitii from 'pages/Achizitii.vue'

import mainHeader from 'src/components/Header.vue'
import mainSidebar from 'src/components/Sidebar.vue'
import mainContent from 'src/components/MainContent.vue'
import mainFooter from 'src/components/Footer.vue'


const routes = [
  { path: '/', component: App },
  { path: '/about', component: About },
  { path: '/achizitii', component: Achizitii },
]

const router = new VueRouter({
  routes // short for routes: routes
})

new Vue({
  el: '#app',
  router,
  components: {
  	mainHeader,
	mainSidebar,
	mainContent,
	mainFooter
  }
})
 