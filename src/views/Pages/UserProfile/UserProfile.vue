<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-default"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center"> </b-container>
      </b-container>
    </div>

    <b-container class="mt--9">
      <b-row>
        <b-col xl="4" class="order-xl-2">
          <user-card></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <Favoritos />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Favoritos from "./Favoritos.vue";
import UserCard from "./UserCard.vue";

export default {
  components: {
    Favoritos,
    UserCard,
  },
};
</script>
<style>
</style>
