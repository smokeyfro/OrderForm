import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue) {

  Vue.component('Layout', DefaultLayout)

  // Include non-SSR packages
	if(process.isClient) {

		const DrawerLayout = require('vue-drawer-layout').default;
		Vue.use(DrawerLayout);
		
	}

}
