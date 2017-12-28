<template>
  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Tabela de Usuários</h3>

        <div class="box-tools pull-right">

        </div>
      </div>
      <div class="box-body">

        <router-link :to="{name: 'Criar Novo Usuário'}">
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
                    <router-link tag="button" :to="{name: 'Editar Usuário', params: { userId: user._id }}" type="button" class="btn btn-warning" v-on:click='editUser(user)'>Editar</router-link>
                    <button type="button" class="btn btn-warning" v-on:click='removeUser(user)'>Deletar</button>
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
</template>

<script>
import moment from 'moment';
import {SAQUA_BACK} from '@/gateways/saqua_back';
import swal from 'sweetalert'


export default {
  data() {
    return {
      users: {}
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).locale('pt-br').format('DD/MM/YY, HH:mm:ss');
    },
    refreshUsers() {
      SAQUA_BACK.get('users').then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    removeUser(user) {
      swal({
        title: "Tem certeza?",
        text: `Deseja mesmo deletar o usuário ${user.username}?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
      .then(willDelete => {
        if (willDelete) {
          SAQUA_BACK.delete(`users/${user._id}`).then(response => {
            swal("Deletado!", "O usuário foi deletado com sucesso!", "success");
            this.refreshUsers();
          })
          .catch(error => {
            console.error(error);
          })
        }
      });

    },
    editUser(){

    }
  },
  beforeMount: function () {
    this.refreshUsers();
  },
}
</script>
