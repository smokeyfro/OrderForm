<template>
    <ul>
        <li v-for="(product, i) in products" :key="i">
            {{ product.title }}
        </li>
    </ul>
</template>
<script>
export default {
    computed: {
        products(){
            return this.$static.products.edges
        }
    }
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