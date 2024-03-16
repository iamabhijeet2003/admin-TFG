<!--src/components/forms/AddProductForm.vue-->
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="formData.name">
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea class="form-control" id="description" v-model="formData.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="price">Price:</label>
                        <input type="number" class="form-control" id="price" v-model="formData.price">
                    </div>
                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input type="number" class="form-control" id="quantity" v-model="formData.quantityAvailable">
                    </div>

            
                    <div class="form-group">
                        <label for="image_url">Image url At:</label>
                        <input type="text" class="form-control" id="image_url" v-model="formData.image">
                    </div>

                     <div class="form-group">
                      
                      <label for="category">Category:</label>
                      <select class="form-control" id="category" v-model="formData.category">
                          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                          }}</option>
                      </select>
                  </div>



                    <button type="submit" class="btn btn-primary">Submit</button>

                    <div v-if="message" :class="messageClass">{{ message }}</div>
                </form>
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
                quantityAvailable: 0,
                //created_at: '',
                image: '',
                category: []
            },
            message: '', // Mensaje de éxito o error
            messageClass: '', // Clase de Bootstrap para el mensaje
            categories: []
        };
    },
    mounted() {
        this.fetchCategories(); // Al montar el componente, cargar las categorías disponibles
    },
    methods: {
        
        async submitForm() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/api/products', {
            name: this.formData.name,
            description: this.formData.description,
            price: this.formData.price,
            category: `/api/categories/${this.formData.category}`, // Adjusted category structure
            quantityAvailable: this.formData.quantityAvailable, // Added quantityAvailable
            image: this.formData.image
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/ld+json'
            }
        });
        console.log('Product added successfully:', response.data);

        // Set the success message
        this.message = 'Producto agregado correctamente';
        this.messageClass = 'alert alert-success';

        // Clear the form after adding the product
        this.formData = {};

        // Optionally, you can emit an event to notify parent components about the successful addition of the product
        this.$emit('productAdded', response.data);
        this.fetchProducts();
    } catch (error) {
        this.message = 'Error al agregar el producto';
        this.messageClass = 'alert alert-danger';
        console.error('Error adding product:', error);
    }
},

        async fetchProducts() {
            try {
                const token = localStorage.getItem('token');
                // Realizar la solicitud para obtener la lista actualizada de productos
                const response = await axios.get('http://127.0.0.1:8000/api/products',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/ld+json'
                    }
                });
                // Actualizar la lista de productos en la interfaz de usuario
                this.$emit('updateProducts', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchCategories() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories',{
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

<style scoped>
/* You can add custom styles here if needed */
</style>
