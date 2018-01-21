<template>
  <div class="wrapper" v-if="userIsSet">
    <notifications group="system" />
    <v-header></v-header>
    <v-side-bar></v-side-bar>
    <v-pre-content></v-pre-content>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from './system/Header.vue'
import SideBar from './system/SideBar.vue'
import Footer from './system/Footer.vue'
import PreContent from './system/PreContent.vue'

export default {
  data() {
    return {
      userIsSet: false
    }
  },
  components: {
    'v-header': Header,
    'v-side-bar': SideBar,
    'v-footer': Footer,
    'v-pre-content': PreContent
  },
  beforeCreate: function () {
    $(window).on('load', function() {
        setTimeout(function() {
          console.log(jQuery);
          $(window).resize();

        }, 10);
    });
    this.$store.dispatch("setCurrentUser").then(() => {
      this.userIsSet = true;
    }).catch((error) => {
      console.log(error);
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    });
  }
}
</script>
