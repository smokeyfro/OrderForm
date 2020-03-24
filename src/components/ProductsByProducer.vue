<template>
    <div class="block w-full p-5 mb-5 bg-gray-100">
        <h2 class="mb-3 text-lg font-bold">{{ this.producer }}</h2>
        <table class="block w-full">
            <tbody class="block w-full">
                <tr v-for="(item, i) in filteredProducts" :key="i" :value="item.node.id" class="block w-full odd:bg-white even:bg-gray-200">
                    <td width="400px">{{ item.node.title }}</td>
                    <td width="100px">R{{ item.node.price }}</td>
                    <td width="100px">{{ item.node.availability }} available</td>
                    <td width="100px" align="right"><button class="inline-block px-2 py-1 text-sm text-black text-white bg-green-700 rounded-md" @click='addToCart(product)'>Add</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        'producer_id': String,
        'producer': String
    },
    computed: mapGetters({
        products: 'allProducts',
        length: 'getNumberOfProducts'
    }),
    computed: {
		filteredProducts() {
			return this.$static.products.edges.filter(edge => {
				return edge.node.producer_id === this.producer_id;
			});
        }
    },
    methods: {
        addToShoppingCart(item) {
            this.$store.commit('push', item)
        }
    },
    methods: mapActions([
        'addToCart'
    ])
}
</script>

<static-query>
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
</static-query>