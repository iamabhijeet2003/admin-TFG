<template>
  <div>
    <h2>Edit Brand</h2>
    <form @submit.prevent="updateBrand">
      <div class="form-group">
        <label for="editBrandName">Brand Name:</label>
        <input type="text" class="form-control" id="editBrandName" v-model="brandName">
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { API_ROOT_URL } from '@/apiConfig';
export default {
  props: ['brandId'],
  data() {
    return {
      brandName: '',
      errorMessage: ''
    };
  },
  async created() {
    await this.fetchBrand();
  },
  methods: {
    async fetchBrand() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_ROOT_URL}/brands/${this.brandId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.brandName = response.data.name;
      } catch (error) {
        this.errorMessage = 'Error fetching brand details.';
        console.error('Error fetching brand details:', error);
      }
    },
    async updateBrand() {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `${API_ROOT_URL}/brands/${this.brandId}`,
          { name: this.brandName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/merge-patch+json'
            }
          }
        );
        // Emit an event to notify the parent component about the update
        this.$emit('brand-updated');
      } catch (error) {
        this.errorMessage = 'Error updating brand.';
        console.error('Error updating brand:', error);
      }
    }
  }
};
</script>

<style>
/* Add custom styles here if needed */
</style>