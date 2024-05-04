<!-- admin-proyecto-02/src/views/contact/ContactList.vue -->
<template>
    <div style="margin-left: 250px;">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
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
          const response = await axios.get('http://localhost:8000/api/contacts', {
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
  