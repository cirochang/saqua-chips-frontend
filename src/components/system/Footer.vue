<template>
  <div id='v-footer'>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> {{this.getVersion}}
      </div>
      <strong>Copyright &copy; 2017 <a href="#">SaquaChips</a>.</strong> All rights
      reserved.
    </footer>
  </div>
</template>

<script>
import PkgJson from '@/../package.json';

  export default {
    computed: {
      getVersion() {
        return PkgJson.version;
      }
    }
  }

</script>
