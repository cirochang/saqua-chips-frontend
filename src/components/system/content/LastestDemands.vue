<template>

    <!-- Main content -->
    <section class="content">

      <div class="row">
        <div class="col-xs-12">
          <!-- interactive chart -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <i class="fa fa-bar-chart-o"></i>

              <h3 class="box-title">Pedidos em Prioridade</h3>

            </div>
            <div class="box-body">
              <ul class="timeline timeline-inverse">
                <!-- timeline time label -->
                <li class="time-label">
                      <span class="bg-purple">
                        Em Fila
                      </span>
                </li>
                <li v-for="demand in demands" class="animated bounceInRight" style="-webkit-animation-fill-mode: backwards;">
                  <i class="fa fa-cutlery bg-purple"></i>

                  <div class="timeline-item">
                    <span class="time"><i class="fa fa-clock-o"></i> {{formatDate(demand.createdAt)}}</span>

                    <h3 class="timeline-header">Ticket: <b>{{demand.ticket}}</b></h3>

                    <div class="timeline-body">
                      <span v-for="product in demand.products">
                        {{product.name}}</br>
                        <img v-bind:src="avatarUrl(product, 'products')" alt="..." class="margin" width="150px" height="100px">
                      </span>
                    </div>
                    <div class="timeline-footer">
                      <div class="btn-group">
                        <button type="button" class="btn" v-bind:class="statusColor[demand.status]">{{statusNames[demand.status]}}</button>
                        <button type="button" class="btn dropdown-toggle" v-bind:class="statusColor[demand.status]" data-toggle="dropdown" aria-expanded="true">
                          <span class="caret"></span>
                          <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                          <li><a @click="updateStatus(demand, 'pending')" href="#">Pendente</a></li>
                          <li><a @click="updateStatus(demand, 'doing')" href="#">Preparando</a></li>
                          <li><a @click="updateStatus(demand, 'done')" href="#">Pronto para entrega</a></li>
                          <li class="divider"></li>
                          <li v-if="currentUser.hasAccess('manager')"><a @click="updateStatus(demand, 'finished')" href="#">Finalizado</a></li>
                          <li class="divider"></li>
                          <li v-if="currentUser.hasAccess('manager')"><a @click="updateStatus(demand, 'canceled')" href="#">Cancelado</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- END timeline item -->
                <li>
                  <i class="fa fa-clock-o bg-gray"></i>
                </li>
              </ul>
            </div>
            <!-- /.box-body-->
          </div>
          <!-- /.box -->

        </div>
        <!-- /.col -->
      </div>

    </section>

</template>

<script>
import {SAQUA_BACK} from '@/gateways/saqua_back';
import moment from 'moment';

export default {
  data() {
      return {
          demands: {},
          statusNames: {
            'pending': 'Pendente',
            'doing': 'Preparando',
            'done': 'Pronto para entrega',
            'finished': 'Finalizado',
            'canceled': 'Cancelado'
          },
          statusColor: {
            'pending': 'btn-warning',
            'doing': 'btn-success',
            'done': 'btn-primary',
            'finished': 'btn-default',
            'canceled': 'brn-danger'
          }
      }
  },
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath[0].children.split("/")[path_index];
    },
    avatarUrl(object, main_uri) {
      return process.env.SAQUA_BACK_URI + "/api/v1/"+ main_uri +"/" + object._id + "/avatar";
    },
    formatDate(date) {
      return moment(date).locale('pt-br').format('HH:mm:ss');
    },
    updateStatus(demand, status) {
      demand.status = status;
      SAQUA_BACK.put(`demands/${demand._id}`, demand).then(response => {
        this.refreshDemands();
      }).catch(err => {
        console.log(err);
      })
    },
    refreshDemands() {
      SAQUA_BACK.get(`demands?status=pending,doing,done&sort_by=createAt,desc`).then(response => {
        this.demands = response.data;
      }).catch(err => {
        console.log(err);
        this.$router.push("/sell");
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  beforeMount() {
    this.refreshDemands();
    setInterval(() => {this.refreshDemands();}, 3000);
  }
}
</script>
