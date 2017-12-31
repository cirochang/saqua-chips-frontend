<template>
  <section class="content">
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title">Tabela de Grupo de Produtos</h3>

        <div class="box-tools pull-right">

        </div>
      </div>
      <div class="box-body">

        <router-link :to="{name: 'Criar Novo Grupo de Produtos'}">
          <a class="btn btn-app">
            <i class="fa fa-plus"></i> Criar Novo Grupo de Produtos
          </a>
        </router-link>

        <div class="row">
          <div class="col-xs-12 table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Nome</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="groupProduct in groupProducts">
                <td>{{groupProduct.name}}</td>
                <td>
                  <div class="btn-group">
                    <router-link tag="button" :to="{name: 'Editar Grupo de Produtos', params: { groupProductId: groupProduct._id }}" type="button" class="btn btn-warning">Editar</router-link>
                    <button type="button" class="btn btn-warning" v-on:click='removeGroupProduct(groupProduct)'>Deletar</button>
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
      groupProducts: {}
    }
  },
  methods: {
    refreshGroupProducts() {
      SAQUA_BACK.get('group_products').then(response => {
        this.groupProducts = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    removeGroupProduct(groupProduct) {
      swal({
        title: "Tem certeza?",
        text: `Deseja mesmo deletar o grupo de produtos ${groupProduct.name}?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
      .then(willDelete => {
        if (willDelete) {
          SAQUA_BACK.delete(`group_products/${groupProduct._id}`).then(response => {
            swal("Deletado!", "O Grupo de Produtos foi deletado com sucesso!", "success");
            this.refreshGroupProducts();
          })
          .catch(error => {
            console.error(error);
          })
        }
      });

    }
  },
  beforeMount: function () {
    this.refreshGroupProducts();
  },
}
</script>
