<template>
  <section class="content">
      <div class="col-md-3" v-for="product in products">
        <router-link :to="{name: 'Caixa Seleção de Ticket', params: { productId: product._id }}">
          <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">{{product.name}}</h3>
            </div>
            <div class="box-body">
              <div class="embed-responsive embed-responsive-16by9">
                <img v-bind:src="avatarUrl(product, 'products')" width="100%" alt="Third slide">              </div>
            </div>
          </div>
        </router-link>
      </div>
  </section>
</template>

<script>
import {SAQUA_BACK} from '@/gateways/saqua_back';


export default {
  data() {
      return {
          products: {}
      }
  },
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath[0].children.split("/")[path_index];
    },
    avatarUrl(object, main_uri) {
      return `${process.env.SAQUA_BACK_URI}/${main_uri}/${object._id}/avatar`;
    },
  },
  beforeMount() {
    SAQUA_BACK.get(`products?groupProduct=${this.$route.params.groupProductId}`).then(response => {
      this.products = response.data;
    }).catch(err => {
      console.log(err);
      this.$router.push("/sell");
    })
  }
}
</script>
