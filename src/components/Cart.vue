<template>
   <div class="p-10 cart">
        <div class="relative">
            <h2 class="text-xl font-bold">Your Cart</h2>
        </div>
        <table class="block w-full">
            <tbody class="block w-full">
                <tr v-for="(item, i) of shoppingCartItems" :key="i" class="block w-full p-3 odd:bg-white even:bg-gray-200">
                    <td class="w-24"><input class="inline w-10 px-4 py-2 mr-1 text-sm text-center border rounded-md" value="1" v-bind="qty" /> of {{ item.node.availability }}</td>
                    <td class="pl-3 pr-5" width="45%">{{ item.node.title }}<br><em>{{ item.node.producer }}</em></td>
                    <td class="text-left" width="20%">R200 Total <span class="block text-sm">({{ item.node.price }} per item)</span>
                     </td>
                    <td width="100px text-xl"><span class="text-2xl">Total: {{ qty * item.node.price }}</span></td>
                    <td class="w-10 text-right">
                        <button class="block px-2 py-0 bg-red-500 rounded-full white-black btn btn-sm btn-danger" @click.prevent="removeItemFromCart(item)">&times;</button>
                    </td>
                </tr>
                <tr v-if="shoppingCartItems != ''">
                    <td class="text-center">No items in your cart</td>
                </tr>
                <!-- <tr>
                    <th></th>
                    <th>{{ cartTotal }}</th>
                    <th></th>
                </tr> -->
            </tbody>
        </table>
        <h2 class="mt-5 text-xl font-bold">Delivery Info</h2>
        <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 md:mr-5">
                <label class="block mt-4">
                    <span class="text-gray-700">Your name</span>
                    <input name="name" id="name" class="block w-full mt-1 bg-gray-100 form-input" placeholder="Dany Targaryen">
                </label>
            </div>
            <div class="md:w-1/2 md:mr-5">
                <label class="block mt-4">
                    <span class="text-gray-700">Email address</span>
                    <input name="email" id="email" class="block w-full mt-1 bg-gray-100 form-input" placeholder="you@yourdomain.com">
                </label>
            </div>
        </div>
        <div>
            <label class="block mt-4 mb-6">
                <span class="text-gray-700" for="address">Address</span>
                <textarea name="address" rows="3" class="block w-full mt-1 bg-gray-100 form-textarea" placeholder=""></textarea>
            </label>
        </div>
        <div class="mb-5 summary">
            Total:${{total}}
            <dl class="text-lg">
                <dt class="float-left w-40 font-bold">Subtotal</dt>
                <dd>R400</dd>
                <dt class="float-left w-40 font-bold">Delivery</dt>
                <dd>R100</dd>
                <dt class="float-left w-40 font-bold">Total</dt>
                <dd>R500</dd>
            </dl>
        </div>
    <button class="px-6 py-3 text-2xl text-white bg-black rounded-md">Place Order</button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            qty: false
        }
    },
    methods: {
        remove(state, item, index) {
			let itemIndex = index
			state.items.splice(itemIndex, 1)
		},
    },
    computed:
    mapGetters({
        shoppingCartItems() {
            // we map the state declared in main.js
            return this.$store.state.items
        },
        totalAmount () {
            return this.$store.getters.total
        }
    }),
}
</script>

<style>

</style>