<template>
  <div class="container">
    <h1 class="text-center h1 mt-3">Product Details</h1>
    <div v-if="loading" class="text-center h1"><span class="loader"></span></div>
    <div v-if="product" class="card">
      <div class="card-body">
        <h3 class="card-title fw-bolder"> {{ product.name }}</h3>
        <p class="card-text h5 "><span class="fw-bolder">Description:</span> {{ product.description }}</p>
        <p class="card-text h5"><span class="fw-bolder">Price:</span> {{ product.price }}€</p>
        <p class="card-text h5"><span class="fw-bolder">Quantity:</span> {{ product.quantityAvailable }}</p>
        <!-- <p class="card-text h5"><span class="fw-bolder">Created At:</span> {{ product.created_at }}</p> -->
        <img :src="product.image" alt="Product Image" style="width: 200px;">
      </div>
    </div>
    <div v-if="!loading && !product">Product not found</div>
    <div class="text-center mt-3">
      <router-link class="btn btn-lg btn-success" to="/products">Go back</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_ROOT_URL } from '@/apiConfig';
export default {
  data() {
    return {
      loading: true,
      product: null,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.id; // Get product ID from route params
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_ROOT_URL}/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include bearer token in headers
          },
        });

        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
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