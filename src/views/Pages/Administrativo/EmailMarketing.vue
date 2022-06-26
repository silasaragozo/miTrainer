<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-5">
    </b-card-header>

    <b-card-body class="mt--6">
      <h2>💌 Email Marketing </h2>
      <div v-if="true">
        Enviar email para todos os usuários pendentes, liberando <strong>7 dias</strong>  de acesso grátis!
      </div>


      <b-row>
        <b-col lg="12" class="mt-3">
            <base-button block type="primary"  @click="enviaEmailMarketing()" >
              Enviar email
            </base-button>
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
     enviaEmailMarketing() {
      const USER_TOKEN = localStorage.getItem("token");
      const USER_ID = localStorage.getItem("id");
      const USER_ON_ID = localStorage.getItem("ativarUser");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      this.$http
        .post(`usuario/enviaEmailMarketing?id=${USER_ON_ID}`, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Email marketing enviado com sucesso!",
            type: "success",
          });
        });
    },
  },

};
</script>
<style></style>
