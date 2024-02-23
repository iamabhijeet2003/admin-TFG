<template>
    <div class="container">
        <div class="row">
            <EditProduct></EditProduct>
            <div class="col">
                <div v-if="loading"><span class="loader"></span></div>
                <table v-if="!loading && products.length" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product['@id']">
                            <td><img :src="product.image_url" alt="Product Image" style="width: 100px;"></td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!loading && !products.length">No products available</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import EditProduct from './EditProduct.vue';
export default {
    components:{
        EditProduct,
    },
    data() {
        return {
            loading: true,
            products: [],
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/productss');
                this.products = response.data['hydra:member'];
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
  
<style scoped>
/* You can add custom styles here if needed */
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  