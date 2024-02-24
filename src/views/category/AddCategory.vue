<template>
    <div>
      <AddCategoryForm @submit="addCategory"></AddCategoryForm>
  
      <!-- Success message -->
      <div v-if="successMessage" class="alert alert-success" role="alert">
        {{ successMessage }}
      </div>
  
      <!-- Error message -->
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import AddCategoryForm from '@/components/forms/AddCategoryForm.vue';
  import axios from 'axios';
  
  export default {
    components: {
      AddCategoryForm
    },
    data() {
      return {
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
        async addCategory(formData) {
    try {
        const data = {
            "@context": "/api/contexts/Category",
                    "@type": "Category",
                    "name": formData.name,
                    "description": formData.description,
                    "created_at": new Date().toISOString() // Assuming you want to use the current timestamp
                };

                const response = await axios.post('http://127.0.0.1:8001/api/categories', data, {
                    headers: {
                        'Content-Type': 'application/ld+json'
                    }
                });

                console.log('Category added successfully:', response.data);

                // Set success message
                this.successMessage = 'Category added successfully';
                this.errorMessage = ''; // Clear error message
            } catch (error) {
                // Set error message
                this.errorMessage = 'Failed to add category';
                this.successMessage = ''; // Clear success message
                console.error('Error adding category:', error);
            }
        }

    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  