<template>
  <section class="content">
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title">Tabela de Grupo de Produtos</h3>

        <div class="box-tools pull-right">

        </div>
      </div>
      <div class="box-body">

        <router-link :to="{name: 'Criar Novo Produto'}">
          <a class="btn btn-app">
            <i class="fa fa-plus"></i> Criar Novo Produto
          </a>
        </router-link>

        <div class="row">
          <div class="col-xs-12 table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Grupo</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in products">
                <td>{{product.name}}</td>
                <td>{{product.price/100}}</td>
                <td>{{product.groupProduct ? product.groupProduct.name : ''}}</td>
                <td>
                  <div class="btn-group">
                    <router-link tag="button" :to="{name: 'Editar Produto', params: { productId: product._id }}" type="button" class="btn btn-warning">Editar</router-link>
                    <button type="button" class="btn btn-warning" v-on:click='removeProduct(product)'>Deletar</button>
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
      products: {},
      group_products: {}
    }
  },
  methods: {
    refreshProducts() {
      SAQUA_BACK.get('products?deleted=false').then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    removeProduct(product) {
      swal({
        title: "Tem certeza?",
        text: `Deseja mesmo deletar o produto ${product.name}?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
      .then(willDelete => {
        if (willDelete) {
          SAQUA_BACK.delete(`products/${product._id}`).then(response => {
            swal("Deletado!", "O Produto foi deletado com sucesso!", "success");
            this.refreshProducts();
          })
          .catch(error => {
            console.error(error);
          })
        }
      });

    }
  },
  beforeMount: function () {
    this.refreshProducts();
  },
}
</script>
