<!--admin/src/views/inventory/InventoryShow.vue-->
<template>
  <div class="container" style="margin-left: 250px;">
    <div class="row">
      <div class="col mx-5 px-4">
        <h1>Inventory</h1>
        <table class="table mx-3 table-striped">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Available Units</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody class="p-2">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td><img :src="product.image" alt="Product Image" style="max-width: 100px;"></td>
              <td>{{ product.name }}</td>
              <td>
                <div v-if="product.quantityAvailable < 10" class="alert alert-danger d-flex justify-content-between">
                  <span class="fs-4 fw-bolder">{{ product.quantityAvailable }}</span>
                  <span class="badge rounded-pill fs-5 bg-danger text-white"> <i
                      class="fa fa-exclamation-triangle fa-lg"></i> Low Inventory</span>
                </div>
                <div v-else class="alert alert-primary">
                  <span class="fs-4 fw-bolder">{{ product.quantityAvailable }}</span>
                </div>
              </td>
              <td>
                <!-- Input field and buttons to modify quantity -->
                <div class="input-group">
                  <button class="btn btn-outline-danger" type="button" @click="decrementQuantity(product)">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                  </button>
                  <input type="number" class="form-control text-center" v-model="product.quantityAvailable" min="0">
                  <button class="btn btn-outline-primary" type="button" @click="incrementQuantity(product)">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
              </td>



            </tr>
          </tbody>
        </table>
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
      products: [],
    };
  },
  mounted() {
    this.fetchInventory();
  },
  methods: {
    async fetchInventory() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_ROOT_URL}/products`,{
          headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/ld+json'
            }
        });
        this.products = response.data['hydra:member'];
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    },
    async incrementQuantity(product) {
      try {
        product.quantityAvailable++;
        await this.updateProduct(product);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async decrementQuantity(product) {
      try {
        if (product.quantityAvailable > 0) {
          product.quantityAvailable--;
          await this.updateProduct(product);
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async updateProduct(product) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_ROOT_URL}/products/${product.id}`, {
          "@context": "/api/contexts/Products",
          "@id": `/api/products/${product.id}`,
          "@type": "Products",
          "quantityAvailable": product.quantityAvailable
        }, {
          headers: {
            'Content-Type': 'application/ld+json',
            Authorization: `Bearer ${token}`,
          }
        });
        console.log('Product updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },

  },
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>
  