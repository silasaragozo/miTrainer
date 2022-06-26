<template>
  <div class="main-content bg-default">
    <notifications></notifications>
    <div>
      <!-- Header -->
      <div class="header bg-img pt-9">
        <!-- Page content -->
        <b-container>
          <div class="header-body text-center mb-8">
            <div class="pb-4">
              <img class="logo" src="img/brand/white.png" />
            </div>
            <b-row class="justify-content-center">
              <b-col xl="5" lg="6" md="8" class="px-5">
                <h2 class="text-white">
                  Atualmente {{ totalLeiloes }} Leilões Online
                </h2>
                <p class="text-lead text-white">
                  Fique por dentro dos principais Leilões do País sem precisar
                  entrar em vários site.
                </p>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
    </div>

    <div class="main-content mt-1 ml-3 mr-3">
      <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <footer class="py-5 invisible" id="footer-main">
      <b-container>
        <b-row align-v="center" class="justify-content-xl-between">
          <b-col xl="6">
            <h1>teste</h1>
          </b-col>
          <b-col xl="6" class="col-xl-6">
            <h1></h1>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
import { BaseNav } from "@/components";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    BaseNav,
    ZoomCenterTransition,
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: "login-page",
      totalLeiloes: "",
    };
  },
  methods: {
    TesteMax() {},
  },
  created: function () {
    this.$http.get("leiloes/total").then((res) => {
      this.totalLeiloes = res.data;
    });
  },
};
</script>

<style lang="scss">
.logo {
  width: 250px;
  height: auto !important;
  z-index: 9999;
}
.bg-img {
  height: 450px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), #172b4d 0.9),
    url("https://source.unsplash.com/1920x1280/?house-exterior");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.main-content .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-content .zoomOut {
  animation-name: zoomOut8;
}
</style>



