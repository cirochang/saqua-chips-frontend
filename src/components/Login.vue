<template>
  <div class="login-box">
    <div class="login-logo">
      <b>Saqua</b>Chips
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Logue-se para iniciar sua sessão</p>

      <form @submit.prevent="login({ username, password })" data-toggle="validator">
        <div class="form-group has-feedback">
          <input autocapitalize="off" autocomplete="on" type="text" class="form-control" placeholder="Usuário" v-model="username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback" v-bind:class="classErrPass">
          <input type="password" class="form-control" placeholder="Senha" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <span class="help-block red">{{errPassMsg}}</span>
        </div>
        <div class="row">

          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <!-- /.social-auth-links -->
    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script>

  export default {

    data() {
      return {
        username: "",
        password: "",
        classErrPass: {
          'has-error': false,
        },
        errPassMsg: "",
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push("/");
        }).catch((error) => {
          this.classErrPass['has-error'] = true;
          this.password = "";
          if(error.response && error.response.status === 404){
            this.errPassMsg = 'O Sistema de backend está desligado';
          }else{
            this.errPassMsg = error.response.data;
          }
        });
      }
    }

  }

</script>
