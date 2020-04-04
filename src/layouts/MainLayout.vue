<template>
  <q-layout view="hHh LpR lFr">
    <q-footer>
      <q-toolbar class="bg-white text-dark footer__navigation row no-wrap justify-between">
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
/*
stuff to do:
SETTINGS
- color blind mode
- take me home
- lang
WHO CAN I HELP
- list of items, contact
I NEED HELP
- list of items, contact
- quote: it's okay to ask:
“Asking for help with shame says:
You have the power over me.
Asking with condescension says:
I have the power over you.
But asking for help with gratitude says:
We have the power to help each other.”
― Amanda Palmer, The Art of Asking; or, How I Learned to Stop Worrying and Let People Help
*/
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
