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

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-6">

                <form role="form">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Nome</label>
                      <input type="name" class="form-control" placeholder="Entre com um nome">
                    </div>
                    <div class="form-group">
                      <label>Posição</label>
                      <select class="form-control">
                        <option>Funcionário</option>
                        <option>Gerente</option>
                        <option v-if="currentUser.hasAccess('director')">Diretor</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Username</label>
                      <input type="email" class="form-control" placeholder="Entre com um username">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Senha</label>
                      <input type="password" class="form-control" placeholder="Entre com uma senha">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputFile">File input</label>
                      <input type="file" id="exampleInputFile">

                      <p class="help-block">Example block-level help text here.</p>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox"> Check me out
                      </label>
                    </div>
                  </div>
                  <!-- /.box-body -->

                  <div class="box-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
            </form>

                <!-- /.form-group -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
            the plugin.
          </div>
        </div>

      </section>
    </div>
  </div>

</template>

<script>
export default {

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  }
}
</script>
