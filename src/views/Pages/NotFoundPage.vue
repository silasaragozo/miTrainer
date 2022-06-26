<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="6" class="px-5">
              <h1 class="text-light">Ooops!</h1>
              <p class="text-lead text-white">
                Página não encontrada. Não se preocupe, temos muitos outros
                páginas para explorar
              </p>

              <router-link to="/home" class="font-weight-bold text-white mt-5"
                >Voltar para as Buscas</router-link
              >
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100"></div>
    </div>
    <!-- Page content -->
    <section class="py-6">
      <b-container> </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>
