<template>
    <div class="container mt-5">
      <h2 class="mb-4">User Management</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Roles</th>
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
          const response = await axios.get('http://localhost:8000/api/users', {
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
  /* Add custom styles if needed */
  </style>
  