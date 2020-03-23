<template>
    <div class="w-full bg-gray-100 p-5 mb-5 block">
        <h2 class="font-bold text-lg mb-3">{{ this.producer }}</h2>
        <table class="w-full block">
            <tbody class="w-full block">
                <tr v-for="(item, i) in filteredProducts" :key="i" :value="item.node.id" class="w-full block odd:bg-white even:bg-gray-200">
                    <td width="400px">{{ item.node.title }}</td>
                    <td width="100px">R{{ item.node.price }}</td>
                    <td width="100px">{{ item.node.availability }} available</td>
                    <td width="100px" align="right"><button class="text-sm bg-green-700 text-white rounded-md inline-block px-2 py-1 text-black" @click.prevent="addToCart(item)">Add</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        'producer_id': String,
        'producer': String
    },
    computed: {
		filteredProducts() {
			return this.$static.allProduct.edges.filter(edge => {
				return edge.node.producer_id === this.producer_id;
			});
        }
    },
    methods: {
        addToCart: function(item) {
            this.cart.push(
                {
                    title: item.title, 
                    price: item.price,
                    quanity: item.quantity
                }
            );
        }
    },
    data(){
        return {
            producerID: this.producer_id
        }
    }
}
</script>

<static-query>
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
</static-query>