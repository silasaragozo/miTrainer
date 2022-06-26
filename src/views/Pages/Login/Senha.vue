<template>
  <div>
    <!-- Header -->

    <!-- Page content -->
    <b-container class="pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small
                  >Digite o email de cadastro para recuperar sua senha!</small
                >
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(recSenha)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="email"
                  >
                  </base-input>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Redefinir</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/login" class="text-light"
                ><small>Faça seu login</small></router-link
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
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    recSenha() {
      this.$http
        .post(`usuario/recuperaSenha?email=` + this.email)
        .then((res) => {
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Uma nova senha foi enviada ao email!" + " " + this.email,
            type: "success",
          });
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
          if (error.response) {
            console.log(error.response.data.message);
          }
        });
    },
  },
};
</script>
