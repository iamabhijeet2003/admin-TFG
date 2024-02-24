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
                    <input type="number" class="form-control" id="quantity" v-model="formData.quantity">
                </div>

                <div class="form-group">
                    <label for="created_at">Created At:</label>
                    <input type="date" class="form-control" id="created_at" v-model="formData.created_at">
                </div>

                <div class="form-group">
                    <label for="created_at">Updated At:</label>
                    <input type="date" class="form-control" id="updayed_at" v-model="formData.updated_at">
                </div>

                <div class="form-group">
                    <label for="image_url">Image url At:</label>
                    <input type="text" class="form-control" id="image_url" v-model="formData.image_url">
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
          quantity: 0
        },
        message: '', // Mensaje de éxito o error
        messageClass: '' // Clase de Bootstrap para el mensaje
      };
    },
    methods: {
        
        async submitForm() {
                try {
                    const response = await axios.post('http://127.0.0.1:8001/api/productss', {
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
                    console.log('Product added successfully:', response.data);
                     // Establecer el mensaje de éxito
                    this.message = 'Producto agregado correctamente';
                    this.messageClass = 'alert alert-success';

                    // Limpiar el formulario después de agregar el producto
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
                        // Realizar la solicitud para obtener la lista actualizada de productos
                        const response = await axios.get('http://127.0.0.1:8001/api/productss');
                        // Actualizar la lista de productos en la interfaz de usuario
                        this.$emit('updateProducts', response.data);
                    } catch (error) {
                        console.error('Error fetching products:', error);
                    }
                    }

  }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  