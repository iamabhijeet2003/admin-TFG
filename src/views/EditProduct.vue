<template>
    <div class="container">
        <div class="row">
            <h1 class="h1 text-center text-primary">Edit Product</h1>
            <div class="col">
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="formData.name" :placeholder="product.name">
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea class="form-control" id="description" v-model="formData.description" :placeholder="product.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="price">Price:</label>
                        <input type="number" class="form-control" id="price" v-model="formData.price" :placeholder="product.price">
                    </div>
                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input type="number" class="form-control" id="quantity" v-model="formData.quantityAvailable" :placeholder="product.quantityAvailable">
                    </div>
                    <!--
                    <div class="form-group">
                        <label for="created_at">Created At:</label>
                        <input type="date" class="form-control" id="created_at" v-model="formData.created_at" :placeholder="product.created_at">
                    </div>
                    <div class="form-group">
                        <label for="updated_at">Updated At:</label>
                        <input type="date" class="form-control" id="updated_at" v-model="formData.updated_at" :placeholder="product.updated_at">
                    </div>-->
                    <div class="form-group">
                        <label for="image_url">Image URL:</label>
                        <input type="text" class="form-control" id="image_url" v-model="formData.image" :placeholder="product.image_url">
                    </div>

                    <div class="form-group">
                      
                      <label for="category">Category:</label>
                      <select class="form-control" id="category" v-model="formData.category">
                          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                          }}</option>
                      </select>
                  </div>
                    <button type="submit" class="btn btn-primary">Update Product</button>
                    <div v-if="message" :class="messageClass">{{ message }}</div>
                </form>

                <div class="text-end" mt-3> 
                    <router-link to="/products" class="btn btn-lg btn-success">Go back to products</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_ROOT_URL } from '@/apiConfig';

export default {
    data() {
        return {
            formData: {
                name: '',
                description: '',
                price: 0,
                quantityAvailable: 0,
                //created_at: '',
                //updated_at: '',
                image: '',
                category: []
            },
            product: {}, // Initialize product object
            message: '',
            messageClass: '',
            categories: []
        };
    },
    mounted() {
        this.fetchProduct();
        this.fetchCategories();
    },
    methods: {
        async submitForm() {
            try {
                const productId = this.$route.params.id; // Get the product ID from route params
                const token = localStorage.getItem('token');
                const response = await axios.put(`${API_ROOT_URL}/products/${productId}`, {
                    "@context": "/api/contexts/Products",
                    "@type": "Products",
                    "name": this.formData.name,
                    "description": this.formData.description,
                    "price": this.formData.price,
                    "quantityAvailable": this.formData.quantityAvailable,
                    //"created_at": this.formData.created_at,
                    //"updated_at": this.formData.updated_at,
                    "image": this.formData.image,
                    category: `/api/categories/${this.formData.category}`,
                }, {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log('Product updated successfully:', response.data);
                this.message = 'Product updated successfully';
                this.messageClass = 'alert alert-success';
            } catch (error) {
                this.message = 'Error updating product';
                this.messageClass = 'alert alert-danger';
                console.log(this.formData)
                console.error('Error updating product:', error);
            }
        },
        async fetchProduct() {
            try {
                const productId = this.$route.params.id;
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_ROOT_URL}/products/${productId}`,{
                    headers: {
                        'Content-Type': 'application/ld+json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                this.product = response.data;
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
        async fetchCategories() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_ROOT_URL}/categories`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/ld+json'
                    }
                });
                this.categories = response.data['hydra:member']; // Almacenar las categorías disponibles en el arreglo
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }


    }
};
</script>

<style scoped>/* Add your custom styles here */</style>
