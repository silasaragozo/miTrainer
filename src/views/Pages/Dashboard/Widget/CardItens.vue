<template>
  <b-card tag="article">
    <div v-if="urlFoto">
      <img class="imgCard" :src="urlFoto" />
    </div>
    <img class="imgCard" v-else src="./img/default.jpg" />
    <div class="cardPadding">
      <div class="d-flex justify-content-end mt--5">
        <b-row>
          <base-button size="sm" type="primary" v-if="banco">{{
            banco
          }}</base-button>
          <div v-if="favorite">
            <b-form role="form" @submit.prevent="deleteFavoritos">
              <base-input alternative class="mb-3 none" v-model="id">
              </base-input>
              <base-button
                :pressed="true"
                icon
                type="danger"
                class="mr-3"
                size="sm"
                native-type="submit"
              >
                <span class="btn-inner--icon"
                  ><i class="text-dafault ni ni-favourite-28"> </i>
                  Remover</span
                >
              </base-button>
            </b-form>
          </div>
          <div v-else>
            <b-form role="form" @submit.prevent="addFavoritos">
              <base-input alternative class="mb-3 none" v-model="id">
              </base-input>
              <base-button
                :pressed="true"
                icon
                type="secondary"
                class="mr-3"
                size="sm"
                native-type="submit"
              >
                <span class="btn-inner--icon"
                  ><i class="text-dafault ni ni-favourite-28"> </i
                ></span>
              </base-button>
            </b-form>
          </div>
        </b-row>
      </div>
      <div class="mt-1">
        <h4 class="mb-2" v-if="title">{{ title }}</h4>
        <div>
           <small class="text-muted" v-if="cidade"
          ><i class="ni ni-pin-3"></i> {{ cidade }} / {{uf}} </small
        >
        </div>
        <small class="text-muted" v-if="endereco"
          ><small v-if="bairro">Bairro: {{bairro}} / </small>  <small v-if="endereco">Rua: {{ endereco }}</small> </small
        >
      </div>
      <div class="dropdown-divider mb--5"></div>
      <h5 class="text-warning mt-6 mb-2 pb-2" v-if="tipoVenda">
        {{ tipoVenda }}
      </h5>
      <b-row class="ml-1">
        <b-col v-if="VVenda">
          <div class="ml--3">
            <p class="text-sm text-muted description mb--5">Valor de venda</p>
            <h5 class="mb-0">
              <a href="javascript:;">{{ VVenda }}</a>
            </h5>
            <p class="text-sm text-muted description">{{ dataLeilaoUm }}</p>
          </div>
        </b-col>
        <b-col v-if="VAvaliado">
          <div class="ml--3">
            <p class="text-sm text-muted description mb--5">
              Valor de Avaliação
            </p>
            <h5 class="mb-0">
              <a href="javascript:;">{{ VAvaliado }}</a>
            </h5>
            <p class="text-sm text-muted description">{{ dataLeilaoDois }}</p>
          </div>
        </b-col>
      </b-row>
      <div class="dropdown-divider mt--3 pb-2"></div>
      <div v-if="descricao" class="mt--3">
        <span class="description">Detalhes:</span><br />
        <p class="h4">{{ descricao }}</p>
      </div>
      <div v-else class="mt--3">
        <span class="description">Detalhes:</span><br />
        <p class="h4">Acesse o leilão para mais informações</p>
      </div>
      <div class="mt-1">
        <a v-if="linkPag" :href="linkPag" target="_blank">
          <base-button size="sm" block outline variant="default"
            >Acessar Leilão</base-button
          >
        </a>
      </div>
    </div>
  </b-card>
</template>
<script>
export default {
  props: {
    id: Number,
    favorite: Number,
    title: String,
    cidade: String,
    uf: String,
    bairro: String,
    endereco: String,
    urlFoto: String,
    descricao: String,
    linkPag: String,
    tipoVenda: String,
    VVenda: String,
    VAvaliado: String,
    dataLeilaoUm: String,
    dataLeilaoDois: String,
    banco: String,
    subCategoria: String,
  },
  data() {
    return {
      userInfo: "",
      userFavoritos: "",
      id: "",
    };
  },

  methods: {
    addFavoritos() {
      const USER_TOKEN = localStorage.getItem("token");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      const USER_ID = localStorage.getItem("id");
      const favorito = { UsuarioId: USER_ID, LeilaoId: this.id };
      this.$http
        .post(`leiloes/favoritos`, favorito, {
          headers: {
            Authorization: AuthStr,
          },
        })
        .then((res) => {
          //Notificação
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message: this.title + " " + "Adicionado aos favoritos com sucesso!",
            type: "success",
          });
        });
    },
    deleteFavoritos() {
      const USER_TOKEN = localStorage.getItem("token");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      const USER_ID = localStorage.getItem("id");
      this.$http
        .delete(`leiloes/favoritos?usuario=${USER_ID}&leilao=${this.id}`, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "center",
            message:
              this.title + "   " + "Removido dos favoritos com sucesso! 👍",
            type: "warning",
          });
          setTimeout(function () {
            window.location.reload(1);
          }, 1000);
        });
    },
  },
};
</script>
<style scoped>
.none {
  display: none;
}
.description {
  font-size: 10px !important;
}
.heading {
  font-size: 14px !important;
}
.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0px;
}
.cardPadding {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}
.imgCard {
  width: 100%;
  border-radius: 5px;
  padding-bottom: 30px;
  height: 200px !important;
  object-position: center;
  object-fit: cover;
}
</style>
