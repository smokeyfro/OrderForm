import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default function (Vue, { router, head, isClient, appOptions  }) {

  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex)

  // Include non-SSR packages
	if(process.isClient) {

		const DrawerLayout = require('vue-drawer-layout').default;
		Vue.use(DrawerLayout);
		
	}

	appOptions.store = new Vuex.Store({
		plugins: [createPersistedState()],
		state: {
		  items: [],
		},
		mutations: {
		  push(state, item) {
			state.items.push(item)
		  },
		  remove(state, item) {
			state.items.slice(this.item)
		  }
		}
	  })

}
