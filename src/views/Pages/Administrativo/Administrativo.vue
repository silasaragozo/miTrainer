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
          <EmailMarketing></EmailMarketing>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <ListUser />
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>
<script>
import ListUser from "../Administrativo/ListUser.vue";
import EmailMarketing from "../Administrativo/EmailMarketing.vue";

export default {
  components: {
    ListUser,
    EmailMarketing,
  },
};
</script>
<style>
</style>
