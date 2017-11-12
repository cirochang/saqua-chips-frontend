<template>
  <div v-if="isLoggedIn">
    <v-system></v-system>
  </div>
  <div v-else>
    <v-login></v-login>
  </div>
</template>

<script>
import Login from './Login.vue'
import System from './System.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'v-login': Login,
    'v-system': System
  },
  computed: mapGetters(['isLoggedIn']),
  watch: {
    isLoggedIn: {
      immediate: true,
      handler(newVal, oldVal) {
        if(newVal){
          document.body.className = 'hold-transition skin-yellow sidebar-mini';
        }else{
          document.body.className =  'login-page';
        }
      }
    },
  }

}
</script>
