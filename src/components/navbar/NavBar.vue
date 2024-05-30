<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://proyecto-final-abhi.vercel.app">Store - Home</a>
            </li>
            
            <li class="nav-item" style="cursor: pointer;">
              <KeepAlive>
                <router-link v-if="!isLoggedIn" to="/login" class="nav-link text-white me-2">




                  <span class="text-black fw-bold">Login</span>
                </router-link>
                <div v-else @click="handleLogout" class="nav-link text-white me-2">


                  <span class="text-black fw-bold">Logout</span>
                </div>
              </KeepAlive>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'; // Import mapGetters from Vuex

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']), // Map isLoggedIn getter
  },
  methods: {
    ...mapActions(['checkAuthentication']), // Map checkAuthentication action
    ...mapActions(['logout']),
    handleLogout() {
      this.logout(); // Call the logout action when the logout button is clicked
    },
  }

}
</script>
<style scoped>
:root {
  --navbar-bg-color: #500af3;
  --navbar-item-hover: #509adf;
  --navbar-item-active: #220b85;
}

.navbar {
  background-color: #cec3e6;
}
</style>