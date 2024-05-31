<!-- admin-proyecto-02/src/views/contact/ContactList.vue -->
<template>

    <div style="margin-left: 250px;" class="me-5 my-2">
        <h1 class="h1 text-center my-3 fw-bolder">
             User Contact Form
        </h1>
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="contact in contacts" :key="contact.id" class="">
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.message }}</td>
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
        contacts: [],
      };
    },
    created() {
      this.fetchContacts();
    },
    methods: {
      async fetchContacts() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_ROOT_URL}/contacts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.contacts = response.data['hydra:member'];
          //console.log(this.contacts)
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      },
    },
  };
  </script>
  