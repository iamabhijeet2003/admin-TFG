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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ extractUserId(order.userId) }}</td>
                    <td>{{ order.total }}</td>
                    <td>{{ formatDateTime(order.created_at) }}</td>
                    <td>
                        <span :class="getStatusClass(order.prepared)">
                            <i v-if="order.prepared" class="bi bi-check-all"></i>
                            <i v-else-if="order.prepared === false" class="bi bi-x-square"></i>
                            <i v-else class="bi bi-hourglass"></i>
                            {{ getStatusText(order.prepared) }}
                        </span>
                    </td>
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
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        extractUserId(userUrl) {
            const parts = userUrl.split('/');
            return parts[parts.length - 1];
        },
        formatDateTime(dateTimeString) {
            const dateTime = new Date(dateTimeString);
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            const formattedTime = dateTime.toLocaleTimeString('en-US', options);
            const day = dateTime.getDate();
            const month = dateTime.getMonth() + 1;
            const year = dateTime.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return `${formattedDate}, ${formattedTime}`;
        },
        getStatusText(prepared) {
            if (prepared === true) {
                return 'Prepared';
            } else if (prepared === false) {
                return 'Canceled';
            } else {
                return 'Pending';
            }
        },
        getStatusClass(prepared) {
            if (prepared === true) {
                return 'text-success fw-bolder fs-5';
            } else if (prepared === false) {
                return 'text-danger fw-bolder fs-5';
            } else {
                return 'text-warning fw-bolder fs-5';
            }
        }
    }
};
</script>

<style></style>
