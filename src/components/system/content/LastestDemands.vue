<template>
  <section class="content">
    <div class="row">
      <div class="col-md-3" v-for="(demand, index) in demands">
        <span v-for="product in demand.products">
          <div class="box box-solid bounceIn animated" style="-webkit-animation-fill-mode: backwards;">
            <div class="box-header with-border">
              <h3 class="box-title">{{product.name}}</h3>

              <div class="box-tools pull-right">
                <i class="fa fa-clock-o"></i> {{formatDate(demand.createdAt)}}
              </div>
            </div>
            <div class="box-body">
              <div class="embed-responsive embed-responsive-16by9">
                <img v-bind:src="avatarUrl(product, 'products')" width="100%" alt="Third slide">
              </div>
            </div>

            <div class="box-footer">
              <div class="row">
                <div class="col-sm-6 col-xs-6">
                  <div class="description-block border-right">
                    <h5 class="description-text">SENHA</h5>
                    <span class="description-header" style="font-size: 30px;">{{demand.ticket}}</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-6 col-xs-6">
                  <div class="description-block border-right">
                    <h5 class="description-text">Status</h5>
                    <span class="description-header">
                      <div class="btn-group">
                        <button type="button" class="btn dropdown-toggle" v-bind:class="statusColor[demand.status]" data-toggle="dropdown" aria-expanded="true">
                          {{statusNames[demand.status]}}
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
                    </span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->

              </div>
              <!-- /.row -->
            </div>


          </div>
        </span>
      </div>
    </div>
    <br></br><br></br>

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
            'canceled': 'btn-danger'
          }
      }
  },
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath[0].children.split("/")[path_index];
    },
    avatarUrl(object, main_uri) {
      return `${process.env.SAQUA_BACK_URI}/${main_uri}/${object._id}/avatar`;
    },
    formatDate(date) {
      return moment(date).local().locale('pt-br').startOf('seconds').fromNow();
    },
    updateStatus(demand, status) {
      demand.status = status;
      if(status==='canceled') {
        swal({
          title: "Tem certeza?",
          text: `Deseja mesmo cancelar a demanda ${demand.ticket}?`,
          icon: "warning",
          dangerMode: true,
          buttons: {
            cancel: true,
            confirm: true,
          },
        }).then(willCancel => {
          if (willCancel) {
            SAQUA_BACK.put(`demands/${demand._id}`, demand).then(response => {
              this.$notify({
                 group: 'system',
                 type: 'warn',
                 title: `Demanda ${demand.ticket} cancelada`,
                 text: `A demanda foi cancelada com sucesso!`
               });
              this.refreshDemands();
            }).catch(err => {
              console.log(err);
            })
          }
        });
      }else{
        SAQUA_BACK.put(`demands/${demand._id}`, demand).then(response => {
          if (status==='finished') {
            this.$notify({
               group: 'system',
               title: `Demanda ${demand.ticket} finalizada`,
               text: `A demanda foi finalizada com sucesso!`
             });
          }
          this.refreshDemands();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    refreshDemands() {
      SAQUA_BACK.get(`demands?status=pending,doing,done&sort_by=createAt,asc`).then(response => {
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
    this.interval = setInterval(() => {this.refreshDemands();}, 3000);
  },

  beforeDestroy: function(){
    clearInterval(this.interval);
  }
}
</script>
