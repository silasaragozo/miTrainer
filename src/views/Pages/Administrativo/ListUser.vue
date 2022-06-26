<template>
  <div>
    <card>
      <b-form>
        <h6 class="heading-small text-muted mb-2">
          Usuários cadastrados no sistema
        </h6>
      </b-form>
      <b-container fluid class="mt-6">
        <!--Tables-->
        <div>
          <b-tabs pills>
            <b-tab active>
              <template v-slot:title>
                🙁 Usuários Pendetes
                <b-badge variant="primary">Total: {{ totalPendente }}</b-badge>
              </template>
              <div class="p-3 mt-2">
                <b-list-group flush class="list my--3">
                  <b-list-group-item
                    v-for="(item, id) in ListUsers"
                    :key="item.id"
                    class="list-group-item px-0"
                    v-if="item.status == 'Pendente'"
                  >
                    <b-row align-v="center">
                      <b-col md="auto">
                        <!-- Avatar -->
                        <a href="javascript:;" class="avatar">
                          <b-img
                            rounded="circle"
                            alt="Image placeholder"
                            src="https://www.cavalocrioulo.org.br/assets/img/sem-foto.jpg"
                          />
                        </a>
                      </b-col>
                      <b-col class="ml--2">
                        <h4 class="mb-0">
                          <a href="javascript:;">
                            {{ item.nome }} {{ id.length }}
                          </a>

                          <b-badge
                            variant="warning"
                            class="ml-2"
                            v-if="item.status == 'Pendente'"
                            >{{ item.status }} pagamento</b-badge
                          >
                          <b-badge
                            variant="success"
                            class="ml-2"
                            v-if="item.status == 'Pago'"
                            >{{ item.status }}</b-badge
                          >
                        </h4>
                        <div class="ml-3 info-user mt-1">
                          <b-row>
                            <h5>
                              <i class="ni ni-mobile-button info-icon"></i>
                              {{ item.telefone }}
                            </h5></b-row
                          >
                          <b-row>
                            <h5>
                              <i class="ni ni-email-83 info-icon"></i>
                              {{ item.email }}
                            </h5></b-row
                          >
                        </div>
                        <small> </small>
                      </b-col>
                      <b-col md="auto">
                        <div>
                          <b-button
                            @click="ativarUser(item, index)"
                            size="sm"
                            variant="primary"
                            v-b-modal="'ativarUser' + item.id"
                            >Ativar Usuário
                          </b-button>
                          <b-button
                            @click="desativarUser(item, index)"
                            size="sm"
                            variant="danger"
                            v-b-modal="'desativarUsser' + item.id"
                            >Desativar Usuário
                          </b-button>
                          <b-modal
                            :id="'ativarUser' + item.id"
                            size="lg"
                            title="Confirmação de ação"
                            centered
                          >
                            Ao clicar em confirmar,
                            <strong>{{ item.nome }}</strong> fica com acesso ao
                            site pelo período de <strong>1 ano!</strong>
                            <template #modal-footer="{ ok, cancel, hide }">
                              <b-button
                                size="sm"
                                variant="secondary"
                                @click="ok()"
                              >
                                Cancelar
                              </b-button>
                              <b-button
                                size="sm"
                                variant="primary"
                                @click="ativarUsuario()"
                              >
                                Confirmar
                              </b-button>
                            </template>
                          </b-modal>
                          <b-modal
                            :id="'desativarUsser' + item.id"
                            size="lg"
                            title="Confirmação de ação"
                            centered
                          >
                            Ao clicar em confirmar,
                            <strong>{{ item.nome }}</strong> deixa de ter acesso
                            a plataforma!
                            <template #modal-footer="{ ok, cancel, hide }">
                              <b-button
                                size="sm"
                                variant="secondary"
                                @click="ok()"
                              >
                                Cancelar
                              </b-button>
                              <b-button
                                size="sm"
                                variant="primary"
                                @click="desativarUsuario()"
                              >
                                Confirmar
                              </b-button>
                            </template>
                          </b-modal>
                        </div>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-tab>

            <b-tab>
              <template v-slot:title>
                🤑 Usuários Ativos/Pagos
                <b-badge variant="primary">Total: {{ totalPago }}</b-badge>
              </template>
              <div class="p-3 mt-2">
                <b-list-group flush class="list my--3">
                  <b-list-group-item
                    v-for="(item, id) in ListUsers"
                    :key="item.id"
                    class="list-group-item px-0"
                    v-if="item.status == 'Pago'"
                  >
                    <b-row align-v="center">
                      <b-col md="auto">
                        <!-- Avatar -->
                        <a href="javascript:;" class="avatar">
                          <b-img
                            rounded="circle"
                            alt="Image placeholder"
                            src="https://www.cavalocrioulo.org.br/assets/img/sem-foto.jpg"
                          />
                        </a>
                      </b-col>
                      <b-col class="ml--2">
                        <h4 class="mb-0">
                          <a href="javascript:;"> {{ item.nome }} </a>

                          <b-badge
                            variant="warning"
                            class="ml-2"
                            v-if="item.status == 'Pendente'"
                            >{{ item.status }} pagamento</b-badge
                          >
                          <b-badge
                            variant="success"
                            class="ml-2"
                            v-if="item.status == 'Pago'"
                            >{{ item.status }}</b-badge
                          >
                        </h4>
                        <div class="ml-3 info-user mt-1">
                          <b-row>
                            <h5>
                              <i class="ni ni-mobile-button info-icon"></i>
                              {{ item.telefone }}
                            </h5></b-row
                          >
                          <b-row>
                            <h5>
                              <i class="ni ni-email-83 info-icon"></i>
                              {{ item.email }}
                            </h5></b-row
                          >
                        </div>
                        <small> </small>
                      </b-col>
                      <b-col md="auto">
                        <div>
                          <b-button
                            @click="ativarUser(item, index)"
                            size="sm"
                            variant="primary"
                            v-b-modal="'ativarUser' + item.id"
                            >Ativar Usuário
                          </b-button>
                          <b-button
                            @click="desativarUser(item, index)"
                            size="sm"
                            variant="danger"
                            v-b-modal="'desativarUsser' + item.id"
                            >Desativar Usuário
                          </b-button>
                          <b-modal
                            :id="'ativarUser' + item.id"
                            size="lg"
                            title="Confirmação de ação"
                            centered
                          >
                            Ao clicar em confirmar,
                            <strong>{{ item.nome }}</strong> fica com acesso ao
                            site pelo período de <strong>1 ano!</strong>
                            <template #modal-footer="{ ok, cancel, hide }">
                              <b-button
                                size="sm"
                                variant="secondary"
                                @click="ok()"
                              >
                                Cancelar
                              </b-button>
                              <b-button
                                size="sm"
                                variant="primary"
                                @click="ativarUsuario()"
                              >
                                Confirmar
                              </b-button>
                            </template>
                          </b-modal>
                          <b-modal
                            :id="'desativarUsser' + item.id"
                            size="lg"
                            title="Confirmação de ação"
                            centered
                          >
                            Ao clicar em confirmar,
                            <strong>{{ item.nome }}</strong> deixa de ter acesso
                            a plataforma!
                            <template #modal-footer="{ ok, cancel, hide }">
                              <b-button
                                size="sm"
                                variant="secondary"
                                @click="ok()"
                              >
                                Cancelar
                              </b-button>
                              <b-button
                                size="sm"
                                variant="primary"
                                @click="desativarUsuario()"
                              >
                                Confirmar
                              </b-button>
                            </template>
                          </b-modal>
                        </div>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-tab>
          </b-tabs>
        </div>

        <!--End tables-->
      </b-container>
    </card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      user: {},
      ListUsers: {},
      totalPendente: "",
      totalPago: "",
    };
  },
  methods: {
    ativarUser(item, id) {
      const USER_ON = item.id;
      localStorage.setItem("ativarUser", USER_ON);
    },

    ativarUsuario() {
      const USER_TOKEN = localStorage.getItem("token");
      const USER_ID = localStorage.getItem("id");
      const USER_ON_ID = localStorage.getItem("ativarUser");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      this.$http
        .put(
          `usuario/ativa?user=${USER_ID}&id=${USER_ON_ID}`,
          { crossdomain: true },
          {
            headers: { Authorization: AuthStr },
          }
        )
        .then((res) => {
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Usuário ativo com sucesso!",
            type: "success",
          });
        })
        .catch((error) => {
          // Error 😨
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Erro ao ativar usuário!",
            type: "danger",
          });
        });
    },
    desativarUser(item, id) {
      const USER_ON = item.id;
      localStorage.setItem("desativarUser", USER_ON);
    },
    desativarUsuario() {
      const USER_TOKEN = localStorage.getItem("token");
      const USER_ID = localStorage.getItem("id");
      const USER_ON_ID = localStorage.getItem("desativarUser");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      this.$http
        .put(
          `usuario/desativa?user=${USER_ID}&id=${USER_ON_ID}`,
          { crossdomain: true },
          {
            headers: { Authorization: AuthStr },
          }
        )
        .then((res) => {
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Usuário desativado com sucesso!",
            type: "success",
          });
        })
        .catch((error) => {
          // Error 😨
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Erro ao desativar usuário!",
            type: "danger",
          });
        });
    },
  },
  created: function () {
    const USER_TOKEN = localStorage.getItem("token");
    const USER_ID = localStorage.getItem("id");
    const AuthStr = "Bearer ".concat(USER_TOKEN);

    this.$http
      .get("usuario/info?id=" + USER_ID, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.ListUsers = res.data;
      });

    this.$http
      .get("usuario/totalPendente?id=" + USER_ID, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.totalPendente = res.data;
      });

    this.$http
      .get("usuario/totalPago?id=" + USER_ID, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.totalPago = res.data;
      });
  },
};
</script>
<style scoped>
.info-user h5 {
  font-weight: 400 !important;
}
.info-icon {
  color: rgba(180, 180, 180, 0.933);
  padding-right: 3px;
}
</style>
