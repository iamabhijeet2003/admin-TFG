<template>
  <Sidebar />
  <NavBar></NavBar>
  <div :style="{ 'margin-left': sidebarWidth }"></div>

  <router-view></router-view>
</template>

<script>
import Sidebar from '@/components/sidebar/SideBar'
import { sidebarWidth } from '@/components/sidebar/state'
import { mapGetters, mapActions } from 'vuex';
import NavBar from './components/navbar/NavBar.vue';
export default {
  name: 'App',
  async mounted() {
    //await this.$store.commit('initialiseStore')
  },
  components: { Sidebar, NavBar },
  setup() {
    return { sidebarWidth }
  },
  computed: {
    ...mapGetters(['isLoggedIn']), // Map isLoggedIn getter
  },
  methods: {
    ...mapActions(['checkAuthentication']), // Map checkAuthentication action
    ...mapActions(['logout']),
    handleLogout() {
      this.logout(); // Call the logout action when the logout button is clicked
    }
  },
  created() {
    this.checkAuthentication(); // Check authentication status when the component is created
  },
}
</script>
