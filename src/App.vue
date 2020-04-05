<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap');
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local('.SFNSText-Light'), local('.HelveticaNeueDeskInterface-Light'),
    local('.LucidaGrandeUI'), local('Ubuntu Light'), local('Segoe UI Light'),
    local('Roboto-Light'), local('DroidSans'), local('Tahoma');
}
body {
  font-family: 'Heebo', 'system', sans-serif;
}
* {
  box-sizing: border-box;
}
#q-app {
  > .q-layout {
    > .q-page-container {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }
}
</style>
