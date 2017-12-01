<template>

  <div id='v-content-users'>
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          Usuários
        </h1>
        <ol class="breadcrumb">
          <li class="active"><a href="#"><i class="fa fa-users"></i> Usuários</a></li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Tabela de Usuários</h3>

            <div class="box-tools pull-right">

            </div>
          </div>
          <div class="box-body">

            <div class="row">
              <div class="col-xs-12 table-responsive">
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Data de Criação</th>
                    <th>Data da última atualização</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in users">
                    <td>{{user.first_name}} {{user.last_name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{moment(user.created_at).locale('pt-br').format('DD/MM/YY, HH:mm:ss')}}</td>
                    <td>{{moment(user.updated_at).locale('pt-br').format('DD/MM/YY, HH:mm:ss')}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>
import moment from 'moment';
import {SAQUA_BACK} from '@/gateways/saqua_back'


export default {
  data() {
    return {
      users: {}
    }
  },
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
  beforeCreate: function () {
    this.moment = moment;
    SAQUA_BACK.get('users').then(response => {
      this.users = response.data;
    })
    .catch(error => {
      console.error(error);
    });
  }
}
</script>
