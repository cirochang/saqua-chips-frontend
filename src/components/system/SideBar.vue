<template>
  <div id='side-bar'>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">NAVEGAÇÃO PRINCIPAL</li>
          <li class="treeview" v-bind:class="{ active: routeName() == 'Lastest Demands' }">
            <router-link :to="{name: 'Lastest Demands'}">
              <i class="fa fa-th-list"></i> <span>Últimos Pedidos</span>
            </router-link>
          </li>
          <li class="treeview" v-bind:class="{ active: routeName() == 'Sell' }">
            <router-link :to="{name: 'Sell'}">
              <i class="fa fa-dollar"></i> <span>Caixa</span>
            </router-link>
          </li>
          <li class="treeview" v-bind:class="{ active: routeName() == 'Products' }">
            <router-link :to="{name: 'Products'}">
              <i class="fa fa-dollar"></i> <span>Produtos</span>
            </router-link>
          </li>
          <li class="treeview" v-bind:class="{ active: routeName() == 'Users' }">
            <router-link :to="{name: 'Users'}">
              <i class="fa fa-users"></i> <span>Usuários</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </router-link>
            <ul class="treeview-menu">
              <li><router-link :to="{name: 'Users Create'}"><i class="fa fa-circle-o"></i> Criar Novo Usuário</router-link></li>
            </ul>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    routeName() {
      return this.$route.name;
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  }
}
</script>
