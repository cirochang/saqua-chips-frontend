<template>
  <div id='v-pre-content'>
     <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
           <h1>
              {{routesName[routesName.length - 1]}}
           </h1>
           <ol class="breadcrumb">
              <li v-for="routeName in routesName" v-bind:class="{ active: routeName === $route.name }">
                <router-link v-if="routeName !== $route.name" :to="{name: routeName}">
                  <i class="fa" v-bind:class="routesIcon[routeName]"></i>
                  {{routeName}}
                </router-link>
                <span v-else>
                  <i class="fa" v-bind:class="routesIcon[routeName]"></i>
                  {{routeName}}
                </span>
              </li>
           </ol>
        </section>
        <router-view></router-view>
     </div>
  </div>
</template>

<script>

export default {
  data() {
      return {
          vm: this,
          routesName: [],
          routesIcon: {
            'Usuários': 'fa-users',
            'Produtos': 'fa fa-cutlery',
            'Caixa': 'fa-dollar'
          }
      }
  },
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath[0].children.split("/")[path_index];
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(newVal, oldVal) {
          //fix bug from footer
          setTimeout(function() {
            $(window).resize();
          }, 100);
          //recursive function
          this.routesName = [];
          var vm = this.vm;
          var getChildrenRoutes = function(routes){
            routes.forEach(route => {
              if(route.path != '/' && vm.$route.fullPath.match(route.path.split('/:')[0]))
                vm.routesName.push(route.name)
              if(route.children && route.children.length > 0)
                getChildrenRoutes(route.children);
            })
          }
          getChildrenRoutes(vm.$router.options.routes);
        }
    }
  }
}
</script>
