<template>
   <div id='v-content-users'>
      <div class="content-wrapper">
         <!-- Content Header (Page header) -->
         <section class="content-header">
            <h1>
               Criar Novo Usuário
            </h1>
            <ol class="breadcrumb">
               <li class="active"><a href="#"><i class="fa fa-users"></i> Criar Novo Usuário</a></li>
            </ol>
         </section>
         <!-- Main content -->
         <section class="content">
            <div class="box box-default">
               <div class="box-header with-border">
                  <h3 class="box-title">Formulário</h3>

               </div>
               <!-- /.box-header -->
               <div class="box-body">
                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group">
                           <label for="exampleInputEmail1">Nome*</label>
                           <input type="name" v-model="newUser.firstName" class="form-control" placeholder="Entre com um nome">
                        </div>
                        <div class="form-group">
                           <label for="exampleInputEmail1">Sobrenome*</label>
                           <input type="name" v-model="newUser.lastName" class="form-control" placeholder="Entre com um nome">
                        </div>

                        <div class="form-group">
                           <label>Posição*</label>
                           <select class="form-control" v-model="newUser.role">
                              <option value="employee">Funcionário</option>
                              <option value="manager">Gerente</option>
                              <option value="director" v-if="currentUser.hasAccess('director')">Diretor</option>
                           </select>
                        </div>

                        <div class="form-group">
                           <label for="exampleInputFile">Foto de Rosto</label>
                           <input type="file" id="exampleInputFile" v-on:change="processFile($event)">
                           <p class="help-block">arquivos .JPG ou .PNG</p>
                        </div>



                     </div>
                     <div class="col-md-6">


                       <div class="form-group">
                          <label for="exampleInputEmail1">Username*</label>
                          <input type="email" v-model="newUser.username" class="form-control" placeholder="Entre com um username">
                       </div>
                       <div class="form-group">
                          <label for="exampleInputPassword1">Senha*</label>
                          <input type="password" v-model="newUser.password" class="form-control" placeholder="Entre com uma senha">
                       </div>
                       <div class="form-group">
                          <label for="exampleInputPassword1">Senha (novamente)*</label>
                          <input type="password" v-model="newUser.passwordConf" class="form-control" placeholder="Entre com uma senha">
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
      </div>
   </div>
</template>

<script>
import {SAQUA_BACK} from '@/gateways/saqua_back';


   export default {
     data() {
       return {
         newUser: {
           firstName: null,
           lastName: null,
           username: null,
           password: null,
           passwordConf: null,
           role: 'employee',
         },
         avatar: null
       }
     },
     methods: {
       createNewUser() {
         console.log('oi')
         //var SAQUA_BACK_MULTIFORM = SAQUA_BACK;
         //console.log(SAQUA_BACK_MULTIFORM);
         //SAQUA_BACK_MULTIFORM.headers['content-type'] = 'multipart/form-data';

         const formData = new FormData(this.newUser);
         formData.append('avatar', this.avatar);
         console.log(formData);
         SAQUA_BACK.post('users', formData).then(response => {
           alert('foi');
         }).catch(error => {
            alert('error');
         })
       },
       processFile() {
         this.avatar = event.target.files[0];
       }
     },
     computed: {
       currentUser() {
         return this.$store.getters.currentUser;
       },
     }
   }
</script>
