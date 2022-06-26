<template>
  <b-row class="justify-content-center">
    <b-col lg="5" md="7">
      <b-card no-body class="bg-secondary border-0 mb-0">
        <b-card-body class="px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Validando suas informações! </small>
            <div class="pb-4 pt-4">
              <img src="./img/Search.gif" />
            </div>
          </div>
        </b-card-body>
      </b-card>
      <b-row class="mt-3">
        <b-col cols="6">
          <router-link to="/login" class="text-light"
            ><small>Ir para tela de Login</small></router-link
          >
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {};
  },

  created: function () {
    const EmailUSER = sessionStorage.getItem("ecache");
    const SenhaUSER = sessionStorage.getItem("ptoken");
    const UserLogin = {
      email: EmailUSER,
      senha: SenhaUSER,
    };

    this.$http
      .post(`usuario/login`, UserLogin)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        sessionStorage.removeItem("ecache");
        sessionStorage.removeItem("ptoken");
        this.$router.push("/home");
      })
      .catch((error) => {
        // Error 😨
        //Notificação
        this.$router.push("/register");
        //window.location = "https://sun.eduzz.com/808914";
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "center",
          message: error.response.data.message,
          type: "danger",
        });
      });
  },
};
</script>


