<template>
    <div class="container" style="margin-left: 250px;">
        <div
            class="product-ratings tw-relative tw-mx-auto tw-rounded-lg tw-bg-gradient-to-tr tw-from-pink-300 tw-to-blue-300 tw-p-0.5 tw-shadow-lg mx-5 mt-4">
            <div class="tw-bg-white tw-p-3 tw-rounded-md m-2">
                <h1 class="h1 fw-bold">Brands</h1>
                <ul class="list-group mt-4">
                    <li v-for="brand in brands" :key="brand.id"
                        class="list-group-item d-flex justify-content-between align-items-center">
                        {{ brand.name }}
                        <button @click="editBrand(brand.id)" class="btn btn-primary">Edit</button>
                    </li>
                    
                </ul>
                <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
        <EditBrand v-if="editingBrand" :brandId="editingBrandId" @brand-updated="fetchBrands" />
    </div>
</template>

<script>
import axios from 'axios';
import EditBrand from './EditBrand.vue';
export default {
    data() {
        return {
            brands: [],
            errorMessage: '',
            editingBrand: false,
            editingBrandId: null
        };
    },
    components: {
        EditBrand
    },
    mounted() {
        this.fetchBrands();
    },
    methods: {
        async fetchBrands() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/brands', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.brands = response.data['hydra:member'];
            } catch (error) {
                this.errorMessage = 'Error fetching brands.';
                console.error('Error fetching brands:', error);
            }
        },
        editBrand(brandId) {
            // Set the editingBrand flag to true and store the ID of the brand being edited
            this.editingBrand = true;
            this.editingBrandId = brandId;
        }
    }
};
</script>

<style>
/* Add custom styles here if needed */
</style>