<template>
  <div id='side-bar'>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">NAVEGAÇÃO PRINCIPAL</li>
          <li class="treeview" v-bind:class="{ active: hasUrlPath('lastest_demands', 1)}">
            <router-link :to="{name: 'Últimas Demandas'}">
              <i class="fa fa-th"></i> <span>Últimos Pedidos</span>
            </router-link>
          </li>
          <li class="treeview" v-if="currentUser.hasAccess('director')" v-bind:class="{ active: hasUrlPath('history_demands', 1)}">
            <router-link :to="{name: 'Histórico de Demandas'}">
              <i class="fa fa-th-list"></i> <span>Histórico de Demandas</span>
            </router-link>
          </li>
          <li class="treeview" v-if="currentUser.hasAccess('manager')" v-bind:class="{ active: hasUrlPath('sell', 1) }">
            <router-link :to="{name: 'Caixa'}">
              <i class="fa fa-dollar"></i> <span>Caixa</span>
            </router-link>
          </li>
          <li class="treeview" v-if="currentUser.hasAccess('manager')" v-bind:class="{ active: hasUrlPath('products', 1) }">
            <router-link :to="{name: 'Produtos'}">
              <i class="fa fa-cutlery"></i> <span>Produtos</span>
            </router-link>
          </li>
          <li class="treeview" v-if="currentUser.hasAccess('manager')" v-bind:class="{ active: hasUrlPath('group_products', 1), 'menu-open': hasUrlPath('group_products', 1) }">
            <router-link :to="{name: 'Grupo de Produtos'}">
              <i class="fa fa-tag"></i> <span>Grupo de Produtos</span>
            </router-link>
          </li>
          <li class="treeview" v-if="currentUser.hasAccess('manager')" v-bind:class="{ active: hasUrlPath('users', 1), 'menu-open': hasUrlPath('users', 1) }">
            <router-link :to="{name: 'Usuários'}">
              <i class="fa fa-users"></i> <span>Usuários</span>
            </router-link>
          </li>
          <!--
          <li class="treeview" v-if="currentUser.hasAccess('manager')" v-bind:class="{ active: hasUrlPath('group_products', 1), 'menu-open': hasUrlPath('group_products', 1) }">
            <router-link :to="{name: 'Grupo de Produtos'}">
              <i class="fa fa-users"></i> <span>Grupo de Produtos</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </router-link>
            <ul class="treeview-menu">
              <li v-bind:class="{ active: hasUrlPath('create', 2)}">
                <router-link :to="{name: 'Criar Novo Grupo de Produtos'}">
                  <i class="fa fa-circle-o"></i>
                   Criar Novo Grupo de Produtos
                 </router-link>
               </li>
            </ul>
          </li>
        -->

        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath.split("/")[path_index];
    }
  },

}
</script>
