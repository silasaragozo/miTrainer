<template>
  <b-row class="justify-content-center">
    <b-col lg="5" md="7">
      <b-card no-body class="bg-secondary border-0 mb-0">
        <b-card-body class="px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Bem Vindo, faça seu Login!</small>
          </div>
          <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
            <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
              <base-input
                alternative
                class="mb-3"
                name="Email"
                :rules="{ required: true, email: true }"
                prepend-icon="ni ni-email-83"
                placeholder="Email"
                v-model="usuario.email"
              >
              </base-input>
              <div class="invalid-feedback">A valid email is required</div>

              <base-input
                alternative
                class="mb-3"
                name="Senha"
                :rules="{ required: true, min: 6 }"
                prepend-icon="ni ni-lock-circle-open"
                type="password"
                placeholder="Senha"
                v-model="usuario.senha"
              >
              </base-input>

              <b-form-checkbox v-model="usuario.rememberMe"
                >Lembrar-me</b-form-checkbox
              >
              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4"
                  >Login</base-button
                >
              </div>
            </b-form>
          </validation-observer>
        </b-card-body>
      </b-card>
      <b-row class="mt-3">
        <b-col cols="6">
          <router-link to="/senha" class="text-light"
            ><small>Esqueceu a senha?</small></router-link
          >
        </b-col>
        <b-col cols="6" class="text-right">
          <router-link to="/register" class="text-light"
            ><small>Crie uma nova conta!</small></router-link
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
      usuario: {
        email: "",
        senha: "",
        rememberMe: false,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$http
        .post(`usuario/login`, this.usuario)
        .then((res) => {
          this.usuario.email = "";
          this.usuario.senha = "";
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.user.id);
          this.$router.push("/redirect");
        })
        .catch((error) => {
          // Error 😨
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: error.response.data.message,
            type: "danger",
          });
        });
    },
  },
};
</script>


