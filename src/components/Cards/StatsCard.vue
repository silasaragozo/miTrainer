<template>
  <card class="card-stats" :show-footer-line="true">
    <b-row>

      <b-col>
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title">{{title}}</h5>
          <small class="text-muted" v-if="subRS">{{subRS}}</small>          
          <span class="h2 font-weight-bold mb-0" v-if="subTitle">{{subTitle}}</span>
        </slot>
      </b-col>

      <b-col cols="auto" v-if="$slots.icon || icon">
               <base-button icon type="primary" v-b-modal.modal-prevent-closing>
                  <span  class="btn-inner--icon"><i :class="icon"></i></span>
                </base-button>
      </b-col>
    </b-row>

  </card>
</template>
<script>
  import Card from './Card.vue';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      icon: String,
      title: String,
      subRS: String,
      subTitle: String,
      linkPag: String,
      iconClasses: [String, Array]
    }
  };
</script>
<style></style>
