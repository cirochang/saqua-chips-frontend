<template>
  <div>
    <v-header></v-header>
    <v-side-bar></v-side-bar>
    <router-view></router-view>
    <v-footer></v-footer>
    <v-control-side-bar></v-control-side-bar>
  </div>
</template>

<script>
import Header from './system/Header.vue'
import SideBar from './system/SideBar.vue'
import Footer from './system/Footer.vue'
import ControlSideBar from './system/ControlSideBar.vue'

export default {
  components: {
    'v-header': Header,
    'v-side-bar': SideBar,
    'v-footer': Footer,
    'v-control-side-bar': ControlSideBar
  }
}
</script>
