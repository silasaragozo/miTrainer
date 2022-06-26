<template>
  <div>
    <card>
      <b-form>
        <h6 class="heading-small text-muted mb-2">Meus favoritos</h6>
      </b-form>
    </card>
    <b-container fluid class="mt-6">
      <!--Tables-->
      <b-row class="mt--3">
        <b-col
          xl="4"
          class="mb-3 mb-xl-3"
          v-for="(item, id) in userFavoritos"
          :key="id"
        >
          <CardItens
            :favorite="true"
            :id="item.id"
            :title="item.descricao"
            :categoria="item.endereco"
            :urlFoto="item.urlFoto"
            :banco="item.textoTipo"
            :tipoVenda="item.status"
            :VVenda="item.valorLeilaoDois"
            :VAvaliado="item.valorLeilaoUm"
            :descricao="item.textoPercentual"
            :dataLeilaoUm="item.dataLeilaoUm"
            :dataLeilaoDois="item.dataLeilaoDois"
            :linkPag="item.url"
          ></CardItens>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
import CardItens from "../Dashboard/Widget/CardItens";

export default {
  components: {
    CardItens,
  },
  data() {
    return {
      user: {},
      userFavoritos: "",
    };
  },
  created: function () {
    const USER_TOKEN = localStorage.getItem("token");
    const USER_ID = localStorage.getItem("id");
    const AuthStr = "Bearer ".concat(USER_TOKEN);

    this.$http
      .get("leiloes/favoritos/" + USER_ID, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.userFavoritos = res.data;
      });
  },
};
</script>
<style></style>
