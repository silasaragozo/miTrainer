<template>
  <div>
    <base-header class="pb-8 pt-md-3 bg-default">
      <b-modal id="modal-1" title="Buscar por categorias" hide-footer="false">
        <Buscar />
      </b-modal>
      <div class="pt-0 pb-8 bg-default">
        <b-container class="pt-4 bg-default">
          <b-container>
            <div>
              <b-container class="d-flex justify-content-center noneBusca">
                <b-input
                  v-model="itemBuscar"
                  placeholder="Busque leilões por palavra chave. Ex: Casa, Apartamento, São Paulo, Celta, Caminhão ....."
                  class="form-control-alternative"
                  v-on:keyup.enter="persist"
                />
                <base-button
                  icon
                  type="danger"
                  class="pl-5 pr-5 ml-3 button-desktop"
                  @click="persist"
                >
                  Buscar
                </base-button>
              </b-container>
              <b-container class="noneBusca mt-3 d-flex justify-content-start">
                <base-button
                  v-b-modal.modal-1
                  @click="categ"
                  size="sm"
                  type="default"
                >
                  Buscar por categorias
                </base-button>
              </b-container>
            </div>
          </b-container>

          <b-container class="mt-3 d-flex justify-content-center button-cel">
            <base-button
              icon
              type="danger"
              class="pl-5 pr-5 ml-3"
              @click="persist"
            >
              Buscar
            </base-button>
          </b-container>
        </b-container>
      </div>
    </base-header>
    <b-container class="mt--4">
      <!--SubCategorias-->
      <div v-if="catName">
        <div v-if="subCategoria == 0">
          <b-row class="mt--6 d-flex justify-content-center" id="infinite-list">
            <b-col xl="9" class="mb-3 mb-xl-3">
              <b-row class="d-flex justify-content-center">
                <b-col md="9" class="mt--9 mb-3">
                  <h2 class="text-white text-center">
                    Não encontramos resultados para
                    <mark>{{ catName }} </mark>
                    <p class="icon-size">😥</p>
                  </h2>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div v-else>
          <b-row class="d-flex justify-content-center">
            <b-col md="8" class="mt--9 mb-3">
              <h2 class="text-white text-center">
                Sua busca pela categoria <mark>{{ catName }}</mark>
              </h2>
            </b-col>
          </b-row>
          <b-row class="mt--6" id="infinite-list">
            <b-col
              xl="3"
              class="mb-3 mb-xl-3"
              v-for="(item, id) in subCategoria"
              :key="id"
            >
              <CardItens
                :id="item.id"
                :title="item.descricao"
                :endereco="item.endereco"
                :cidade="item.cidade"
                :uf="item.uf"
                :bairro="item.bairro"
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
        </div>
        <!--Paginação-->
        <div class="d-flex justify-content-center">
          <b-pagination
            v-model="currentPageCategoria"
            :total-rows="totalPagsubCategoria"
            :per-page="perPage"
            first-number
            last-number
          ></b-pagination>
        </div>
      </div>

      <div v-else>
        <!--Palavra chave/Leilões em destaque-->
        <!--Palavra Chave-->
        <div v-if="palavraChave">
          <div v-if="leiloesPalavraChave == 0">
            <b-row
              class="mt--6 d-flex justify-content-center"
              id="infinite-list"
            >
              <b-col xl="9" class="mb-3 mb-xl-3">
                <b-row class="d-flex justify-content-center">
                  <b-col md="9" class="mt--9 mb-3">
                    <h2 class="text-white text-center">
                      Não encontramos resultados para
                      <mark>{{ palavraChave }} </mark>
                      <p class="icon-size">😥</p>
                    </h2>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-row
              class="mt--6 d-flex justify-content-center"
              id="infinite-list"
            >
              <b-col xl="9" class="mb-3 mb-xl-3">
                <b-row class="d-flex justify-content-center">
                  <b-col md="9" class="mt--9 mb-3">
                    <h2 class="text-white text-center">
                      Resultado encontrado para <mark>{{ palavraChave }} </mark>
                    </h2>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row class="mt--6" id="infinite-list">
              <b-col
                xl="3"
                class="mb-3 mb-xl-3"
                v-for="(item, id) in leiloesPalavraChave"
                :key="id"
              >
                <CardItens
                  :id="item.id"
                  :title="item.descricao"
                  :endereco="item.endereco"
                  :cidade="item.cidade"
                  :uf="item.uf"
                :bairro="item.bairro"
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
          </div>

          <!--Paginação-->
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPageFilter"
              :total-rows="totalPagPalavraChave"
              :per-page="perPage"
              first-number
              last-number
            ></b-pagination>
          </div>
        </div>
        <!--Leiloes destaque-->
        <div v-else>
          <b-row class="d-flex justify-content-center">
            <b-col md="8" class="mt--9 mb-5">
              <h1 class="text-white text-center">Leilões em destaques 🏆</h1>
            </b-col>
          </b-row>
          <b-row class="mt--6" id="infinite-list">
            <b-col
              xl="3"
              class="mb-3 mb-xl-3"
              v-for="(item, id) in leiloesDestaque"
              :key="id"
            >
              <CardItens
                :id="item.id"
                :title="item.descricao"
                :endereco="item.endereco"
                :cidade="item.cidade"
                :uf="item.uf"
                :bairro="item.bairro"
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
          <!--Paginação
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="TotalPaginas"
              :per-page="perPage"
              first-number
              last-number
            ></b-pagination>
          </div>-->
        </div>
      </div>
      <!--End Cards-->
    </b-container>
  </div>
</template>


<script>
import CardItens from "./Widget/CardItens";
import Buscar from "./Widget/Buscar";

export default {
  data() {
    return {
      leiloesPalavraChave: [],
      leiloesDestaque: [],
      perPage: 1,
      currentPage: 0,
      currentPageFilter: 0,
      currentPageCategoria: 0,
      palavraChave: "",
      itemBuscar: "",
      totalLeiloes: "",
      TotalPaginas: "",
      leiloesPagina: "",
      subCategoria: "",
      totalPagPalavraChave: "",
      catName: "",
      totalPagsubCategoria: "",
    };
  },
  mounted() {
    if (localStorage.buscar) this.palavraChave = localStorage.buscar;
    const subCategoria = localStorage.getItem("SubCat");
    this.catName = subCategoria;
  },
  watch: {
    palavraChave() {
      this.docurrentChave();
    },
    totalPagPalavraChave() {
      this.docurrentChave();
    },
    currentPage() {
      this.docurrentPage();
    },
    currentPageFilter() {
      this.docurrentChave();
    },
    currentPageCategoria() {
      this.docurrentPageSubCategoria();
    },
  },
  methods: {
    persist() {
      const itemBuscar = localStorage.getItem("buscar");
      localStorage.buscar = this.itemBuscar;
      localStorage.setItem("SubCat", "");
      document.location.reload(true);
    },
    // Filtro por palavra chave
    docurrentChave() {
      const USER_TOKEN = localStorage.getItem("token");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      this.$http
        .get(
          `leiloes/filtro/palavraChave/` +
            this.palavraChave +
            "/" +
            this.currentPageFilter,
          {
            headers: { Authorization: AuthStr },
          }
        )
        .then((res) => {
          this.leiloesPalavraChave = res.data;
        });
      //Total de paginas por palavra chave
      this.$http
        .get("leiloes/filtro/palavraChave/total/" + this.palavraChave, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          this.totalPagPalavraChave = res.data;
        });
    },
    // Leilões por subCategorias.
    docurrentPageSubCategoria() {
      const USER_TOKEN = localStorage.getItem("token");
      const AuthStr = "Bearer ".concat(USER_TOKEN);
      const subCategoria = localStorage.getItem("SubCat");
      this.$http
        .get(
          "leiloes/subcategoria/" +
            subCategoria +
            "/" +
            this.currentPageCategoria,
          {
            headers: { Authorization: AuthStr },
          }
        )
        .then((res) => {
          this.subCategoria = res.data;
        });
      // Total de paginas por subCategorias
      this.$http
        .get("leiloes/subcategoria/total/" + subCategoria, {
          headers: { Authorization: AuthStr },
        })
        .then((res) => {
          this.totalPagsubCategoria = res.data;
          console.log(this.totalPagsubCategoria);
        });
    },
  },
  created: function () {
    const USER_TOKEN = localStorage.getItem("token");
    const AuthStr = "Bearer ".concat(USER_TOKEN);

    // Total de leilões
    this.$http.get("leiloes/total").then((res) => {
      this.totalLeiloes = res.data;
    });
    // Leilões em Destaque.
    this.$http.get("leiloes/destaques").then((res) => {
      this.leiloesDestaque = res.data;
    });

    // Total de paginas (Todos os Leilões).
    this.$http
      .get("leiloes/paginas", {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        this.TotalPaginas = res.data;
      });
  },
  components: {
    CardItens,
    Buscar,
  },
};
</script>

<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.noneBusca {
  padding-left: 20%;
  padding-right: 20%;
}
.button-cel {
  display: none !important;
}
@media (max-width: 992px) {
  .noneBusca {
    padding-left: 0%;
    padding-right: 0%;
  }
  .button-cel {
    display: block !important;
    padding-left: 25% !important;
  }
  .button-desktop {
    display: none !important;
  }
}
.icon-size {
  font-size: 50px;
}
</style>

