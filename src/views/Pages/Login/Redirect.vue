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
    return {
      userInfo: "",
    };
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
        if (this.userInfo.ativo == true) {
          this.$router.push("/home");
        } else {
          window.location = "https://sun.eduzz.com/808914";
        }
      });
  },
};
</script>


