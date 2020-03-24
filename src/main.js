import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import store from './store/index.js'

export default function (Vue, { router, head, isClient, store  }) {

  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex)

  // Include non-SSR packages
	if(process.isClient) {

		const DrawerLayout = require('vue-drawer-layout').default;
		Vue.use(DrawerLayout);
		
	}

	// appOptions.store = new Vuex.Store({
	// 	plugins: [createPersistedState()],
	// 	state: {
	// 	  products: [],
	// 	  cart: []
	// 	},
	// 	getters: {
	// 		total: state => {
	// 			if(state.items.length > 0) {
	// 				return state.items.map(item => item.price, quantity => item.quantity ).reduce((total, quantity) => total + quantity);
	// 			} else {
	// 				return 0;
	// 			}
	// 		}
	// 	},
	// 	mutations: {
	// 	  push(state, item) {
	// 		state.items.push(item)
	// 	  },
	// 	  remove(state, item, itemIndex) {
    //         state.items.splice(itemIndex, 1)
	// 	  },
	// 	  clear(state, item) {
	// 		state.items.splice(item)
	// 	  }
	// 	}
	//   })

}
