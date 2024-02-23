<template>
   <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }"></div>
  
  <router-view></router-view>
</template>

<script>
import Sidebar from '@/components/sidebar/SideBar'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  name: 'App',
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
}
</script>


