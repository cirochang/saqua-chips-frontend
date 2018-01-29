<template>
  <div id='v-header'>
    <header class="main-header">
      <!-- Logo -->
      <router-link :to="{ name: 'Home'}" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>S</b>C</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Saqua</b>Chips</span>
      </router-link>

      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">

            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img v-bind:src="avatarUrl(currentUser, 'users')" class="user-image" alt="User Image">
                <span class="hidden-xs">{{currentUser.firstName}} {{currentUser.lastName}}</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img v-bind:src="avatarUrl(currentUser, 'users')" class="img-circle" alt="User Image">
                  <p>
                    {{currentUser.firstName}} {{currentUser.lastName}}
                    <small>Membro desde {{ currentUser.created_at }}</small>
                  </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">

                  <!-- /.row -->
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-right" v-on:click="logout()">
                    <a href="#" class="btn btn-default btn-flat">Sair</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import moment from 'moment';

export default {

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    avatarUrl(object, main_uri) {
      return `${process.env.SAQUA_BACK_URI}/${main_uri}/${object._id}/avatar`;
    },
  },
  computed: {
    currentUser() {
      var user = this.$store.getters.currentUser;
      user.created_at = moment(user.created_at).locale('pt-BR').format('LL');
      return user;
    }
  }

}

</script>
