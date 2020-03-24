import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import store from './store/index.js'

export default function (Vue, { router, head, isClient, store, appOptions  }) {

  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex)

  // Include non-SSR packages
	if(process.isClient) {

		const DrawerLayout = require('vue-drawer-layout').default;
		Vue.use(DrawerLayout);
		
	}
	appOptions.store = store

}
