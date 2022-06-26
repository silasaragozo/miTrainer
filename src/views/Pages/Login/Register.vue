<template>
  <div>
    <!-- Page content -->
    <b-container class="pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Bem Vindo, faça seu Cadastro!</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(RegUser)">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-circle-08"
                    placeholder="Nome Completo"
                    name="Nome"
                    :rules="{ required: true }"
                    v-model="usuario.Nome"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-badge"
                    placeholder="CPF ou CNPJ"
                    name="CPF ou CNPJ"
                    :rules="{ required: true }"
                    v-model="usuario.CnpjCpf"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-mobile-button"
                    placeholder="Celular: 33 9 9999-9999"
                    name="Número"
                    :rules="{ required: true }"
                    v-model="usuario.Celular"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    v-model="usuario.Email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Senha"
                    type="password"
                    name="Senha"
                    :rules="{ required: true, min: 8 }"
                    v-model="usuario.Senha"
                  >
                  </base-input>
                  <b-row class="my-4">
                    <b-col cols="12">
                      <!--
                      <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </b-form-checkbox>
                      </base-input>
                      -->
                    </b-col>
                  </b-row>

                  <b-row class="justify-content-center d-flex">
                    <router-link to="/login" class="ml-3">
                      <div class="text-center">
                        <b-button variant="secondary" class="mt-4"
                          >Login</b-button
                        >
                      </div>
                    </router-link>
                    <div>&emsp;&emsp;</div>
                    <div class="text-center">
                      <base-button
                        native-type="submit"
                        variant="primary"
                        class="mt-4"
                        >Cadastrar</base-button
                      >
                    </div>
                  </b-row>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usuario: {
        Nome: "",
        Email: "",
        Senha: "",
        Celular: "",
        CnpjCpf: "",
      },
    };
  },
  methods: {
    RegUser() {
      const CadastrarUser = {
        Nome: this.usuario.Nome,
        Email: this.usuario.Email,
        Senha: this.usuario.Senha,
        Celular: this.usuario.Celular,
        CnpjCpf: this.usuario.CnpjCpf,
      };
      this.$http
        .post(`usuario`, CadastrarUser)
        .then((res) => {
          sessionStorage.setItem("ecache", this.usuario.Email);
          sessionStorage.setItem("ptoken", this.usuario.Senha);
          //Redireciona para pagína eduzz
          window.location = "https://sun.eduzz.com/808914";

          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: "Usuário cadastrado com sucesso!",
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
        });
    },
  },
};
</script>

