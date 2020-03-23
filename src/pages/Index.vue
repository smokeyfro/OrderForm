<template>
  <Layout>
      <form class="block overflow-visible">
		  <ClientOnly>
			  <vue-drawer-layout ref="drawerLayout" :drawer-width="600" :backdrop-opacity-range="[0,.6]" :reverse="true" :content-drawable="true">
				  <div class="drawer-content" slot="drawer">
            <div class="cart p-10">
              <div class="relative">
                <h2 class="text-xl font-bold">Your Cart</h2>
                <button class="absolute top-0 right-0 mt-0 mr-0 rounded-full hover:bg-transparent hover:text-accent" @click.prevent="handleToggleDrawer">
								  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
							  </button>
              </div>
              <table class="w-full block">
                <tbody class="w-full block">
                    <tr v-for="(item, index) in cart" :key="index" class="w-full block odd:bg-white even:bg-gray-200 p-3">
                        <td class="w-20"><input class="border w-6 mr-3 text-center text-sm py-1 rounded-md" value="1" :v-bind="quantity" /> of {{ item.quanity }}</td>
                        <td class="pr-5" width="40%">{{ item.title }}</td>
                        <td class="w-30 mr-4" width="20%">{{ item.producer }}</td>
                        <td class="font-bold text-right">{{ item.price }}</td>
                        <td width="100px">R{{ quantity * item.price }}</td>
                        <td class="w-10 text-right">
                          <button class="bg-red-500 white-black rounded-full py-0 px-2 block btn btn-sm btn-danger" @click.prevent="removeFromCart(index)">&times;</button>
                        </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>{{ cartTotal }}</th>
                      <th></th>
                    </tr>
                </tbody>
              </table>
              <h2 class="text-xl font-bold mt-5">Delivery Info</h2>
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2 md:mr-5">
                  <label class="block mt-4">
                      <span class="text-gray-700">Your name</span>
                      <input name="name" id="name" class="block w-full mt-1 form-input bg-gray-100" placeholder="Dany Targaryen">
                  </label>
                </div>
                <div class="md:w-1/2 md:mr-5">
                    <label class="block mt-4">
                        <span class="text-gray-700">Email address</span>
                        <input name="email" id="email" class="block w-full mt-1 form-input bg-gray-100" placeholder="you@yourdomain.com">
                    </label>
                </div>
              </div>
              <div>
                <label class="block mt-4 mb-6">
                  <span class="text-gray-700" for="address">Address</span>
                  <textarea name="address" rows="3" class="bg-gray-100 block w-full mt-1 form-textarea" placeholder=""></textarea>
                </label>
              </div>
              <div class="summary mb-5">
                <dl class="text-lg">
                  <dt class="w-40 float-left font-bold">Subtotal</dt>
                  <dd>R400</dd>
                  <dt class="w-40 float-left font-bold">Delivery</dt>
                  <dd>R100</dd>
                  <dt class="w-40 float-left font-bold">Total</dt>
                  <dd>R500</dd>
                </dl>
              </div>
            <button class="rounded-md bg-black text-white py-3 px-6 text-2xl">Place Order</button>
          </div>
				</div>
          <div class="relative block h-screen overflow-y-scroll" slot="content">
            <div class="p-10 max-w-3xl mx-auto">
              <div class="flex justify-start flex-col relative items-center mb-6">
                <img src="/logo.png" class="w-24">
                <div>
                  <h1 class="text-4xl font-bold mt-0">Garden Route Bazaar</h1>
                  <p class="text-xl mt-0 mb-5">Ethically sourced produce delived to your door</p>
                </div>
              </div>
              <div class="w-full bg-gray-100 p-5 mb-5 block">
                  <h2 class="font-bold text-lg mb-3"></h2>
                  <table class="w-full block">
                      <tbody class="w-full block">
                          <tr v-for="(item, index) in $page.allProduct.edges" :key="index" :value="item.node.id" class="w-full block odd:bg-white even:bg-gray-200">
                              <td width="400px">{{ item.node.title }}</td>
                              <td width="100px">R{{ item.node.price }}</td>
                              <td width="100px"><input class="border w-6 mr-3 text-center text-sm py-1 rounded-md" value="1" :v-bind="quantity" /> of {{ item.node.availability }}</td>
                              <td width="100px" align="right"><button class="text-sm bg-green-700 text-white rounded-md inline-block px-2 py-1 text-black" @click.prevent="addToCart(item)">Add</button></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <!-- <ProductsByProducer producer_id="1" producer="Janes Poultry" />
              <ProductsByProducer producer_id="2" producer="Forest Glade Farm" />
              <ProductsByProducer producer_id="3" producer="Jacks Meat" />
              <ProductsByProducer producer_id="4" producer="Rondevlei Herb Farm" /> -->
            </div>
            <button class="fixed top-0 right-0 block text-xl mr-10 block mt-6 py-3 px-5 rounded-md bg-green-700 text-white font-semibold" @click.prevent="handleToggleDrawer">
              Cart ({{ numInCart }})
            </button>
            {{ producersList }}
          </div>
			  </vue-drawer-layout>
		  </ClientOnly>
    </form>

  </Layout>
</template>

<script>
import ProductsByProducer from "~/components/ProductsByProducer.vue"

export default {
  components: {
    ProductsByProducer
  },
  data() {
    return {
      cart: [],
      item: this.item
    }
  },
  computed:{
    producersList() {
      let producers = []
      for(let i = 0; i < this.cart.length; i++){
        producers = JSON.stringify(this.$page.allProduct.edges[i].producer_id);
      }
      return producers;
    },
    cartTotal: function(){
      let sum = 0;
      for(let i = 0; i < this.cart.length; i++){
        sum += (parseFloat(this.cart[i].price) * parseFloat(this.cart[i].quantity));
      }

     return sum;
   },
    numInCart() { 
      return this.cart.length; 
    },
    total(item) {
      return item.node.quantity * item.node.price;
    },
  },
  methods:{
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle();
    },
    removeFromCart() {
      this.cart.splice(index, 1)
    },
    addToCart: function(item) {
      this.cart.push(
        {
            title: item.node.title,
            price: item.node.price,
            availability: item.node.availability,
            quantity: item.quantity,
            producer: item.node.producer
        }
      );
    }
  },
  metaInfo: {
    title: 'Hello, world!'
  },
}
</script>

<page-query>
query Products {
		allProduct {
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
