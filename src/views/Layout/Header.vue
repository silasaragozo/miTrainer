<template >
  <div>
    <div>
      <notifications></notifications>
      <go-top :size="50" :bottom="60" bg-color="#172b4d" :radius="5"></go-top>

      <div class="header pt-8 bg-img2 text-center">
        <b-container
          class="d-flex justify-content-end text-white pr-5 mt--7 pb-6"
        >
          <router-link
            to="/home"
            class="nav-link pr-0"
            @click.prevent
            slot="title-container"
          >
            <b-media no-body class="align-items-center text-white">
              <i class="ni ni-zoom-split-in"></i>
              <b-media-body class="ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">Buscar</span>
              </b-media-body>
            </b-media>
          </router-link>
          <router-link
            to="/profile"
            class="nav-link pr-0"
            @click.prevent
            slot="title-container"
          >
            <b-media no-body class="align-items-center text-white">
              <i class="ni ni-favourite-28"></i>
              <b-media-body class="ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">Favoritos</span>
              </b-media-body>
            </b-media>
          </router-link>
          <base-dropdown menu-on-right variant="secondary" text="Secondary">
            <a
              href="#"
              class="nav-link pr-0"
              @click.prevent
              slot="title-container"
            >
              <b-media no-body class="align-items-center text-white">
                <i class="ni ni-circle-08"></i>
                <b-media-body class="ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold"
                    >Olá, {{ userInfo.nome }}
                  </span>
                </b-media-body>
              </b-media>
            </a>

            <template>
              <b-dropdown-header class="noti-title">
                <h6 class="text-overflow m-0">Olá!</h6>
              </b-dropdown-header>
              <b-dropdown-item v-if="userInfo.nivel == 2">
                <router-link
                  to="/Administrativo"
                  style="text-decoration: none; color: inherit"
                >
                  <i class="ni ni-spaceship"></i>
                  <span> Painel Administrativo</span>
                </router-link>
              </b-dropdown-item>

              <b-dropdown-item>
                <router-link
                  to="/profile"
                  style="text-decoration: none; color: inherit"
                >
                  <i class="ni ni-single-02"></i>
                  <span> Meu perfil</span>
                </router-link>
              </b-dropdown-item>

              <div class="dropdown-divider"></div>

              <b-dropdown-item @click="removeItem">
                <i class="ni ni-button-power"></i>
                <span> Sair</span>
              </b-dropdown-item>
            </template>
          </base-dropdown>
        </b-container>

        <b-link class="pb-4" to="home">
          <img class="logo" src="img/brand/white.png" />
        </b-link>

        <b-row class="justify-content-center pb--5">
          <b-col xl="5" class="px-3">
            <h2 class="text-white">
              Atualmente {{ totalLeiloes }} Leilões Online
            </h2>
            <p class="text-lead text-white px-3">
              Fique por dentro dos principais Leilões do País sem precisar
              entrar em vários site.
            </p>
          </b-col>
        </b-row>
      </div>
      <div>
        <zoom-center-transition
          :duration="pageTransitionDuration"
          mode="out-in"
        >
          <router-view></router-view>
        </zoom-center-transition>
      </div>
    </div>
  </div>
</template>

<script>
import GoTop from "@inotom/vue-go-top";
export default {
  data() {
    return {
      userInfo: "",
      totalLeiloes: "",
    };
  },
  components: {
    GoTop,
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
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.$router.push("/login");
          this.clear = localStorage.clear();
        }
      });
    // Total de leilões
    this.$http.get("leiloes/total").then((res) => {
      this.totalLeiloes = res.data;
    });
  },
  methods: {
    removeItem: function () {
      this.clear = localStorage.clear();
      document.location.reload(true);
    },
  },
};
</script>
<style scoped>
.bg-img2 {
  height: 350px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), #172b4d 0.9),
    url("https://source.unsplash.com/1920x1280/?house-exterior");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style> >



