<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-5">
    </b-card-header>

    <b-card-body class="mt--6">
      <h2>Olá, {{ userInfo.nome }}</h2>
      <div v-if="true">
        Assinatura:<mark :v-model="userInfo.ativo">ATIVA</mark>
      </div>
      <div v-else>Assinatura:<mark>DESATIVADA</mark></div>

      <b-row>
        <b-col lg="12" class="mt-3">
          <blockquote class="blockquote">
            <p class="mb-0">CPF/CNPJ: {{ userInfo.cnpjCpf }}</p>
            <p class="mb-0">Email: {{ userInfo.email }}</p>
          </blockquote>
          <b-form role="form" v-on:submit.prevent="atualizarSenha">
            <base-input
              type="password"
              label="Nova senha"
              placeholder="Nova senha"
              v-model="senha"
            >
            </base-input>

            <base-button block type="primary" native-type="submit">
              Atualizar Senha
            </base-button>
          </b-form>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      senha: "",
      userInfo: "",
    };
  },
  methods: {
    atualizarSenha() {
      const USER_TOKEN = localStorage.getItem("token");
      const USER_ID = localStorage.getItem("id");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      const Atualizar = { Id: USER_ID, Senha: this.senha };
      this.$http
        .put(`usuario`, Atualizar, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Senha atualizada com sucesso!",
            type: "success",
          });
        });
    },
  },
  created: function () {
    const USER_TOKEN = localStorage.getItem("token");
    const USER_ID = localStorage.getItem("id");
    const AuthStr = "Bearer ".concat(USER_TOKEN);

    this.$http
      .get("usuario/info/" + USER_ID, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.userInfo = res.data;
      });
  },
};
</script>
<style></style>
