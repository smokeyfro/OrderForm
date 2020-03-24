<template>
  <Layout>
      <form class="block overflow-visible">
		  <ClientOnly>
			  <vue-drawer-layout ref="drawerLayout" :drawer-width="800" :backdrop-opacity-range="[0,.6]" :reverse="true" :content-drawable="true">
				  <div class="drawer-content" slot="drawer">
           <Cart />
            <button class="absolute top-0 right-0 mt-5 mr-5 rounded-full hover:bg-transparent hover:text-accent" @click.prevent="handleToggleDrawer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
				  </div>
          <div class="relative block h-screen overflow-y-scroll" slot="content">
              <div class="max-w-3xl p-10 mx-auto">
                <div class="relative flex flex-col items-center justify-start mb-6">
                <img src="/logo.png" class="w-24">
                <div>
                    <h1 class="mt-0 text-4xl font-bold">Garden Route Bazaar</h1>
                    <p class="mt-0 mb-5 text-xl">Ethically sourced produce delived to your door</p>
                </div>
                </div>
                <ProductsByProducer producer_id="1" producer="Janes Poultry" />
                <ProductsByProducer producer_id="2" producer="Forest Glade Farm" />
                <ProductsByProducer producer_id="3" producer="Jacks Meat" />
                <ProductsByProducer producer_id="4" producer="Rondevlei Herb Farm" />
            </div>
            <button class="fixed top-0 right-0 block px-5 py-3 mt-6 mr-10 text-xl font-semibold text-white bg-green-700 rounded-md" @click.prevent="handleToggleDrawer">
              Cart 
            </button>
          </div>
			  </vue-drawer-layout>
		  </ClientOnly>
    </form>
  </Layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ProductsByProducer from "~/components/ProductsByProducer.vue"
import Cart from "~/components/Cart.vue"

export default {
  components: {
    ProductsByProducer,
    Cart
  },
  // computed:{
  //   // itemsInCart(){
	// 	// 	let cart = this.$store.getters.cartProducts;
	// 	// 	return cart.reduce((accum, item) => accum + item.quantity, 0)
	// 	// }
  // },
  mounted() {
    this.$store.commit('setItems', this.$page.products)
  },
  methods:{
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle();
    },
    // removeFromCart() {
    //   this.cart.splice(index, 1)
    // },
  },
  metaInfo: {
    title: 'Hello, world!'
  },
}
</script>

<page-query>
query Products {
		products: allProduct {
			edges {
				node {
          id
          title
					producer
          producer_id
					price
					availability
				}
			}
		}
	}
</page-query>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
