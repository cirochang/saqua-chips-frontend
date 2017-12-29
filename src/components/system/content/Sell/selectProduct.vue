<template>
  <section class="content">
      <div class="col-md-3" v-for="product in groupProduct.products">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{product.name}}</h3>
          </div>
          <div class="box-body">
            <div class="embed-responsive embed-responsive-16by9">
              <img v-bind:src="avatarUrl(product, 'products')" alt="Third slide">              </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>


export default {
  data() {
      return {
          groupProduct: {}
      }
  },
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath[0].children.split("/")[path_index];
    },
    avatarUrl(object, main_uri) {
      return process.env.SAQUA_BACK_URI + "/api/v1/"+ main_uri +"/" + object.id + "/avatar";
    },
  },
  beforeMount() {
    SAQUA_BACK.get(`group_products/${this.$route.params.productId}`).then(response => {
      this.groupProduct = response.data;
    }).catch(err => {
      console.log(err);
      this.$router.push("/sell");
    })
  }
}
ript>
