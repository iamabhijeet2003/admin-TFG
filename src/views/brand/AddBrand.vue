<template>
    <div class="container" style="margin-left: 250px;">
        <div
            class="product-ratings tw-relative tw-mx-auto tw-rounded-lg tw-bg-gradient-to-tr tw-from-pink-300 tw-to-blue-300 tw-p-0.5 tw-shadow-lg mx-5 mt-4">
            <div class="tw-bg-white tw-p-3 tw-rounded-md m-2">
                <h1 class="h1 fw-bold">Add Brand</h1>
                <form @submit.prevent="addBrand">
                    <div class="form-group">
                        <label for="brandName" class="fs-4 fw-bold">Brand Name:</label>
                        <input type="text" class="form-control" id="brandName" v-model="brandName">
                    </div>
                    <button type="submit" class="btn btn-primary mt-4">Add Brand</button>
                </form>
                <div v-if="successMessage" class="alert alert-success" role="alert">
                    {{ successMessage }}
                </div>
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                    {{ errorMessage }}
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
            brandName: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async addBrand() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    `${API_ROOT_URL}/brands`,
                    { name: this.brandName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/ld+json'
                        }
                    }
                );
                if (response.status === 201) {
                    this.successMessage = 'Brand added successfully.';
                    this.errorMessage = '';
                    this.brandName = '';
                }
            } catch (error) {
                this.successMessage = '';
                this.errorMessage = 'Error adding brand.';
                console.error('Error adding brand:', error);
            }
        }
    }
};
</script>

<style>
/* Add custom styles here if needed */
</style>