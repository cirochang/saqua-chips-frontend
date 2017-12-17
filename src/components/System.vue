<template>
  <div class="wrapper" v-if="userIsSet">
    <v-header></v-header>
    <v-side-bar></v-side-bar>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from './system/Header.vue'
import SideBar from './system/SideBar.vue'
import Footer from './system/Footer.vue'

export default {
  data() {
    return {
      userIsSet: false
    }
  },
  components: {
    'v-header': Header,
    'v-side-bar': SideBar,
    'v-footer': Footer
  },
  beforeCreate: function () {
    this.$store.dispatch("setCurrentUser").then(() => {
      this.userIsSet = true;
      // nothing to do
    }).catch((error) => {
      console.log(error);
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    });
  }
}
</script>
