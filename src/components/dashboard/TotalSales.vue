<template>
    <div class="sales-box">
        <h3>Total Orders Today</h3>
        <p>{{ totalOrdersToday }}</p>
    </div>
</template>

<script>
import { API_ROOT_URL } from '@/apiConfig';
export default {
    data() {
        return {
            totalOrdersToday: 0
        };
    },
    mounted() {
        this.fetchOrdersData();
    },
    methods: {
        async fetchOrdersData() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_ROOT_URL}/orders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                const orders = data['hydra:member'];
                const today = new Date().toISOString().split('T')[0];

                const totalOrdersToday = orders.reduce((count, order) => {
                    if (order.created_at.startsWith(today)) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                this.totalOrdersToday = totalOrdersToday;
            } catch (error) {
                console.error('Error fetching orders data:', error);
            }
        }
    }
};

</script>


<style scoped>
.sales-box {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    font-size: 1.5em;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}
</style>
