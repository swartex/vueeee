import Vue from 'vue'
import App from './App.vue'
import List from './List'

Vue.component('list', List);
new Vue({
  el: '#app',
  render: h => h(App)
})
