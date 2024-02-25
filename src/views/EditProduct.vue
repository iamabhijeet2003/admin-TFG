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
                        <input type="number" class="form-control" id="quantity" v-model="formData.quantity" :placeholder="product.quantity">
                    </div>
                    <div class="form-group">
                        <label for="created_at">Created At:</label>
                        <input type="date" class="form-control" id="created_at" v-model="formData.created_at" :placeholder="product.created_at">
                    </div>
                    <div class="form-group">
                        <label for="updated_at">Updated At:</label>
                        <input type="date" class="form-control" id="updated_at" v-model="formData.updated_at" :placeholder="product.updated_at">
                    </div>
                    <div class="form-group">
                        <label for="image_url">Image URL:</label>
                        <input type="text" class="form-control" id="image_url" v-model="formData.image_url" :placeholder="product.image_url">
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

export default {
    data() {
        return {
            formData: {
                name: '',
                description: '',
                price: 0,
                quantity: 0,
                created_at: '',
                updated_at: '',
                image_url: '',
            },
            product: {}, // Initialize product object
            message: '',
            messageClass: '',
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        async submitForm() {
            try {
                const productId = this.$route.params.id; // Get the product ID from route params
                const response = await axios.put(`http://127.0.0.1:8001/api/products/${productId}`, {
                    "@context": "/api/contexts/Products",
                    "@type": "Products",
                    "name": this.formData.name,
                    "description": this.formData.description,
                    "price": this.formData.price,
                    "quantity": this.formData.quantity,
                    "created_at": this.formData.created_at,
                    "updated_at": this.formData.updated_at,
                    "image_url": this.formData.image_url
                }, {
                    headers: {
                        'Content-Type': 'application/ld+json'
                    }
                });

                console.log('Product updated successfully:', response.data);
                this.message = 'Product updated successfully';
                this.messageClass = 'alert alert-success';
            } catch (error) {
                this.message = 'Error updating product';
                this.messageClass = 'alert alert-danger';
                console.error('Error updating product:', error);
            }
        },
        async fetchProduct() {
            try {
                const productId = this.$route.params.id;
                const response = await axios.get(`http://127.0.0.1:8001/api/products/${productId}`);
                this.product = response.data;
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

    }
};
</script>

<style scoped>/* Add your custom styles here */</style>
