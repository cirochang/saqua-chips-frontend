<template>

         <!-- Main content -->
         <section class="content">
            <div class="box box-primary">
               <div class="box-header with-border">
                  <h3 class="box-title">Formulário</h3>

               </div>
               <!-- /.box-header -->
               <div class="box-body">
                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group" v-bind:class="{'has-error': errors.firstName }">
                           <label for="exampleInputEmail1">Nome*</label>
                           <input type="name" v-model="user.firstName" class="form-control" placeholder="Entre com um nome">
                           <span class="help-block" v-if='errors.firstName'>{{errors.firstName.message}}</span>
                        </div>
                        <div class="form-group" v-bind:class="{'has-error': errors.lastName }">
                           <label for="exampleInputEmail1">Sobrenome*</label>
                           <input type="name" v-model="user.lastName" class="form-control" placeholder="Entre com um nome">
                           <span class="help-block" v-if='errors.lastName'>{{errors.lastName.message}}</span>
                        </div>
                        <div class="form-group" v-bind:class="{'has-error': errors.role }">
                           <label>Posição*</label>
                           <select class="form-control" v-model="user.role">
                              <option value="employee">Funcionário</option>
                              <option value="manager">Gerente</option>
                              <option value="director" v-if="currentUser.hasAccess('director')">Diretor</option>
                           </select>
                           <span class="help-block" v-if='errors.role'>{{errors.role.message}}</span>
                        </div>
                        <div class="form-group" v-bind:class="{'has-error': errors.avatar }">
                           <label for="exampleInputFile">Foto de perfil</label>
                           <img class="img-responsive pad image" :src="imageSrc" v-if="imageSrc" alt="Photo" style='width: 150px;'>
                           <input type="file" id="exampleInputFile" v-on:change="processImage" accept="image/*">
                           <p class="help-block">arquivos .JPG ou .PNG</p>
                           <span class="help-block" v-if='errors.avatar'>{{errors.avatar.message}}</span>
                        </div>
                     </div>
                     <div class="col-md-6">
                       <div class="form-group" v-bind:class="{'has-error': errors.username }">
                          <label for="exampleInputEmail1">Username*</label>
                          <input type="email" v-model="user.username" class="form-control" placeholder="Entre com um username">
                          <span class="help-block" v-if='errors.username'>{{errors.username.message}}</span>
                       </div>
                       <div class="form-group" v-bind:class="{'has-error': errors.password }">
                          <label for="exampleInputPassword1">Senha*</label>
                          <input type="password" v-model="user.password" class="form-control" placeholder="Entre com uma senha">
                          <span class="help-block" v-if='errors.password'>{{errors.password.message}}</span>
                       </div>
                       <div class="form-group" v-bind:class="{'has-error': errors.passwordConf }">
                          <label for="exampleInputPassword1">Senha (novamente)*</label>
                          <input type="password" v-model="user.passwordConf" class="form-control" placeholder="Entre com uma senha">
                          <span class="help-block" v-if='errors.passwordConf'>{{errors.passwordConf.message}}</span>
                       </div>

                     </div>
                     <!-- /.col -->
                  </div>
                  <!-- /.row -->
               </div>
               <!-- /.box-body -->
               <div class="box-footer">
                 <button type="submit" v-on:click="createNewUser()" class="btn btn-primary">Criar</button>
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
         user: {
           role: 'employee',
         },
         avatar: null,
         imageSrc: null,
         errors: {},         
       }
     },
     methods: {
       createNewUser() {
         const formData = new FormData();
         for(var key in this.user) {
           formData.append(key, this.user[key]);
         }
         formData.append('avatar', this.avatar);
         SAQUA_BACK.post('users', formData).then(response => {
           this.$notify({
              group: 'system',
              title: `Novo Usuário Criado`,
              text: `O usuário ${this.user.username} foi criado com sucesso!`
            });
            this.$router.push("/users");
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
     computed: {
       currentUser() {
         return this.$store.getters.currentUser;
       },
     }

   }
</script>
