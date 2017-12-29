<template>
  <section class="content">
    <div class="row">
      <div class="col-md-3" v-for="groupProduct in groupProducts">
        <router-link :to="{name: 'Caixa Seleção de Produto', params: { groupProductId: groupProduct._id }}">
          <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">{{groupProduct.name}}</h3>
            </div>
            <div class="box-body">
              <div class="embed-responsive embed-responsive-16by9">
                <img v-bind:src="avatarUrl(groupProduct, 'group_products')" alt="Third slide">              </div>
            </div>
          </div>
        </router-link>
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
      groupProducts: {},
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
    avatarUrl(object, main_uri) {
      return process.env.SAQUA_BACK_URI + "/api/v1/"+ main_uri +"/" + object.id + "/avatar";
    },
  },
  beforeMount: function () {
    this.refreshGroupProducts();
  },

}
</script>
