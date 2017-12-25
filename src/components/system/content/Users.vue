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

            <router-link :to="{name: 'Users Create'}">
              <a class="btn btn-app">
                <i class="fa fa-plus"></i> Criar Novo Usuário
              </a>
            </router-link>

            <div class="row">
              <div class="col-xs-12 table-responsive">
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Data de Criação</th>
                    <th>Última atualização</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in users">
                    <td>{{user.firstName}} {{user.lastName}}</td>
                    <td>{{user.username}}</td>
                    <td>{{formatDate(user.created_at)}}</td>
                    <td>{{formatDate(user.updated_at)}}</td>
                    <td>
                      <div class="btn-group">
                        <button type="button" class="btn btn-warning">Editar</button>
                        <button type="button" class="btn btn-warning">Deletar</button>
                      </div>
                    </td>
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
import {SAQUA_BACK} from '@/gateways/saqua_back';


export default {
  data() {
    return {
      users: {}
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).locale('pt-br').format('DD/MM/YY, HH:mm:ss');
    }
  },
  beforeCreate: function () {
    SAQUA_BACK.get('users').then(response => {
      this.users = response.data;
    })
    .catch(error => {
      console.error(error);
    });
  }
}
</script>
