<template>
    <div class="container" style="margin-left: 250px;">
        <router-link to="/addbrand" class="btn btn-success mt-2 ms-5">Add new Brand</router-link>
        <div
            class="product-ratings tw-relative tw-mx-auto tw-rounded-lg tw-bg-gradient-to-tr tw-from-pink-300 tw-to-blue-300 tw-p-0.5 tw-shadow-lg mx-5 mt-4">
            <div class="tw-bg-white tw-p-3 tw-rounded-md m-2">
                <h1 class="h1 fw-bold">Brands</h1>
                <ul class="list-group mt-4">
                    <li v-for="brand in brands" :key="brand.id"
                        class="list-group-item d-flex justify-content-between align-items-center">
                        {{ brand.name }}
                        <div>
                            <button @click="editBrand(brand.id)" class="btn btn-primary">Edit <i class="bi bi-pencil-square"></i></button>
                            <button @click="deleteBrand(brand.id)" class="btn btn-danger ms-2">Delete <i class="bi bi-trash3"></i></button>
                        </div>
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
import Swal from 'sweetalert2';
import { API_ROOT_URL } from '@/apiConfig';
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
                const response = await axios.get(`${API_ROOT_URL}/brands`, {
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
        },
        async deleteBrand(brandId) {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });

                if (result.isConfirmed) {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${API_ROOT_URL}/brands/${brandId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    Swal.fire(
                        'Deleted!',
                        'The brand has been deleted.',
                        'success'
                    );
                    this.fetchBrands();
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the brand.',
                    'error'
                );
                console.error('Error deleting brand:', error);
            }
        }
    }
};
</script>

<style>
/* Add custom styles here if needed */
</style>