<template>
  <q-layout view="hHh LpR lFr">
    <q-footer>
      <q-toolbar
        class="bg-white text-dark footer__navigation row no-wrap justify-between"
      >
        <q-btn
          stretch
          flat
          no-caps
          icon="fal fa-question-circle"
          label="Who can I help?"
          class="q-pt-sm"
        />
        <q-btn
          stretch
          flat
          no-caps
          icon="fal fa-exclamation-circle"
          label="I need help"
          class="q-pt-sm"
        />
        <q-btn stretch flat no-caps icon-right="fal fa-cog" class="q-pt-sm" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {},

  data() {
    return {};
  },
};
</script>

<style lang="scss">
@mixin lg {
  @media (min-width: $tablet-max-width) {
    @content;
  }
}

footer {
  max-width: 600px;
  margin: 0 auto;
  @include lg() {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  h1 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5rem;
  }

  .footer__navigation {
    padding: 0;
  }

  .q-toolbar__title {
    display: none;
    /* @include lg() {
      display: block;
    } */
  }
}
</style>
