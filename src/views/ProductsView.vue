<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="text-center h1 mt-3">Products Page</h1>
                <AddProduct></AddProduct>
            </div>
            <div class="col-12 text-center">
                <!-- Sort buttons -->
            <div class="btn-group mt-3">
                <button @click="sortByPrice('asc')" class="btn btn-sm btn-primary">Sort by Price (Asc)</button>
                <button @click="sortByPrice('desc')" class="btn btn-sm btn-primary">Sort by Price (Desc)</button>
            </div>
                <div v-if="loading" class="text-center h1"><span class="loader"></span></div>
                <table v-if="!loading && products.length" class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product Id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">View</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product['@id']">
                            <td class="fw-bolder"> {{ product.id }}</td>
                            <td><img :src="product.image" alt="Product Image" style="width: 80px;"></td>
                            <td class="fw-bolder ">{{ product.name }}</td>
                            <td class="text-info">{{ product.description }}</td>
                            <td class="text-primary">{{ product.price }}€</td>
                            <td>{{ product.quantityAvailable }}</td>
                            <td>
                                <router-link :to="{ name: 'SingleProductView', params: { id: product.id } }"
                                    class="btn btn-md btn-primary mx-2"><i class="bi bi-eye"></i></router-link>
                            </td>
                            <td>
                                <router-link :to="{ name: 'EditProduct', params: { id: product.id } }"
                                    class="btn btn-md btn-warning mx-2"><i
                                        class="bi bi-pencil-square"></i></router-link>
                            </td>
                            <td>
                                <button @click="confirmDelete(product.id)" class="btn btn-md btn-danger mx-2"><i
                                        class="bi bi-trash3"></i></button>
                            </td>
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
import AddProduct from './ModalAddProduct.vue';
import { API_ROOT_URL } from '@/apiConfig';
import { mapState } from "vuex";
export default {
    components: {
        AddProduct,
    },
    data() {
        return {
            loading: true,
            products: [],
        };
    },
    mounted() {
        this.fetchProducts();
        if (this.isAuthenticated) {
            this.fetchProducts();
        }
    },
    computed: {
        ...mapState(["isAuthenticated"]),
    },
    methods: {
        async fetchProducts() {

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_ROOT_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                });
                this.products = response.data['hydra:member'];
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        },
        async confirmDelete(productId) {
    // Get the product name before confirming deletion
    const productToDelete = this.products.find(product => product.id === productId);
    const productName = productToDelete ? productToDelete.name : 'the product';

    const confirmDelete = await this.$swal({
        title: `Are you sure you want to delete ${productName}?`,
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (confirmDelete.isConfirmed) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_ROOT_URL}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            this.$swal('Deleted!', 'Product deleted successfully', 'success');
            // Refresh the product list after deletion
            this.fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            this.$swal('Error', 'Failed to delete product', 'error');
        }
    } else {
        // Show the name of the product in the alert message
        this.$swal('Cancelled', `Deleting canceled for ${productName}`, 'info');
    }
},
async sortByPrice(order) {
            // Set loading to true while fetching data
            this.loading = true;

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_ROOT_URL}/products?order[price]=${order}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                });
                this.products = response.data['hydra:member'];
            } catch (error) {
                console.error('Error fetching sorted products:', error);
            } finally {
                // Set loading to false after fetching data
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