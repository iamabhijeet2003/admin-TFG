<template>
    <div class="container mt-5" style="margin-left: 250px;">
      <h2 class="mb-4 fs-2 fw-bold">User Management</h2>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
          <td>
            {{ user.firstName }}
          </td>
          <td>
            {{ user.last }}
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { API_ROOT_URL } from '@/apiConfig';
  export default {
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_ROOT_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.users = response.data['hydra:member'];
          console.log(this.users)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    }
  };
  </script>
  
  <style>

  </style>
  