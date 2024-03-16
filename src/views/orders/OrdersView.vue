<template>
    <div class="container">
        <h1 class="h1 text-center">Orders</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Total Price</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ extractUserId(order.userId) }}</td>
                    <td>{{ order.total }}</td>
                    <td>{{ formatDateTime(order.created_at) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            orders: []
        };
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.orders = response.data['hydra:member'];
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        extractUserId(userUrl) {
            // Split the user URL by '/' and get the last element which is the user ID
            const parts = userUrl.split('/');
            return parts[parts.length - 1];
        },
        formatDateTime(dateTimeString) {
      const dateTime = new Date(dateTimeString);
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = dateTime.toLocaleTimeString('en-US', options);
      const day = dateTime.getDate();
      const month = dateTime.getMonth() + 1; // Month is zero-indexed, so we add 1
      const year = dateTime.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return `${formattedDate}, ${formattedTime}`;
    }
    }
};
</script>

<style></style>