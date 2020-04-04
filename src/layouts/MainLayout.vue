<template>
  <q-layout view="hHh LpR lFr">
    <q-footer class="bg-blue text-light">
      <q-toolbar class="footer__navigation">
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/sad.svg" />
          </q-avatar>
          <h1>Vem kan jag hjälpa?</h1>
        </q-toolbar-title>
        <q-separator vertical />
        <q-btn stretch flat no-caps icon="fal fa-search" label="Search" />
        <q-separator vertical />
        <q-btn stretch flat label="Link" />
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
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  h1 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5rem;
  }

  .q-toolbar__title {
    display: none;
    @include lg() {
      display: block;
    }
  }
}
</style>
