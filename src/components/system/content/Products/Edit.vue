<template>

   <!-- Main content -->
   <section class="content">
      <div class="box box-warning">
         <div class="box-header with-border">
            <h3 class="box-title">Formulário</h3>

         </div>
         <!-- /.box-header -->
         <div class="box-body">
            <div class="row">
               <div class="col-md-6">
                  <div class="form-group" v-bind:class="{'has-error': errors.name }">
                     <label for="exampleInputEmail1">Nome*</label>
                     <input type="name" v-model="product.name" class="form-control" placeholder="Entre com um nome">
                     <span class="help-block" v-if='errors.name'>{{errors.name.message}}</span>
                  </div>

                  <div class="form-group" v-bind:class="{'has-error': errors.groupProduct }">
                     <label>Grupo de Produtos*</label>
                     <select class="form-control" v-model="product.groupProduct">
                        <option v-for="groupProduct in groupProducts" v-bind:value="groupProduct._id">groupProduct.name</option>
                     </select>
                     <span class="help-block" v-if='errors.groupProduct'>{{errors.groupProduct.message}}</span>
                  </div>

               </div>
               <div class="col-md-6">

                 <div class="form-group" v-bind:class="{'has-error': errors.price }">
                    <label for="exampleInputEmail1">Preço*</label>
                    <input type="number" v-model="product.price" class="form-control" placeholder="Entre com um preço. ex: 3.20">
                    <span class="help-block" v-if='errors.price'>{{errors.price.message}}</span>
                 </div>

                 <div class="form-group" v-bind:class="{'has-error': errors.avatar }">
                    <label for="exampleInputFile">Foto do grupo</label>
                    <img class="img-responsive pad image" :src="imageSrc" v-if="imageSrc" alt="Photo" style='width: 150px;'>
                    <input type="file" id="exampleInputFile" v-on:change="processImage" accept="image/*">
                    <p class="help-block">arquivos .JPG ou .PNG</p>
                    <span class="help-block" v-if='errors.avatar'>{{errors.avatar.message}}</span>
                 </div>
               </div>
               <!-- /.col -->
            </div>
            <!-- /.row -->
         </div>
         <!-- /.box-body -->
         <div class="box-footer">
           <button type="submit" v-on:click="updateProduct()" class="btn btn-primary">Atualizar</button>
            Campos com * são obrigatórios.
         </div>
      </div>
   </section>

</template>

<script>
import {SAQUA_BACK} from '@/gateways/saqua_back';

   export default {
     data() {
       return {
         product: {},
         groupProducts: {},
         avatar: null,
         imageSrc: null,
         errors: {},
       }
     },
     methods: {
       updateProduct() {
         const formData = new FormData();
         for(var key in this.product) {
           formData.append(key, this.product[key]);
         }
         formData.append('avatar', this.avatar);
         SAQUA_BACK.put(`products/${this.$route.params.productId}`, formData).then(response => {
           this.$notify({
              group: 'system',
              title: `Produto Atualizado`,
              text: `O Produto ${this.product.name} foi atualizado com sucesso!`
            });
            this.$router.push("/products");
         }).catch(err => {
           console.log(err);
           this.errors = err.response.data;
         })
       },
       processImage: function(e) {
          this.avatar = e.target.files[0];
          var reader = new FileReader();
          reader.onload = (e) => {
            this.imageSrc = e.target.result;
          };
          reader.readAsDataURL(this.avatar);
       }
     },
     beforeMount() {
       SAQUA_BACK.get(`products/${this.$route.params.productId}`).then(response => {
         this.product = response.data;
         this.imageSrc = `${process.env.SAQUA_BACK_URI}/api/v1/products/${this.$route.params.productId}/avatar`;
         SAQUA_BACK.get(`group_products`).then(response => {
           this.groupProducts = response.data;
         }).catch(err => {
           console.log(err);
           this.$router.push("/products");
         });
       }).catch(err => {
         console.log(err);
         this.$router.push("/products");
       })
     }
   }
</script>
