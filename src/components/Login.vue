<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>Saqua</b>Chips</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Logue-se para iniciar sua sessão</p>

      <form @submit.prevent="login({ username, password })">
        <div class="form-group has-feedback">
          <input type="name" class="form-control" placeholder="Usuário" v-model="username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Senha" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox"> Lembrar de mim
              </label>
            </div>
          </div>
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
        password: ""
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push("/")
        });
      }
    }

  }

</script>
