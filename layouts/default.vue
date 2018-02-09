<template>
  <div>
    <the-header @sidenavToggle="displaySidenav=!displaySidenav"></the-header>
    <the-sidenav :show="displaySidenav" @close="displaySidenav=false"></the-sidenav>
    <nuxt/>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import TheHeader from '@/components/Navigation/TheHeader';
import TheSidenav from '@/components/Navigation/TheSidenav';

export default {
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    };
  }
};
</script>
<style>
html {
  font-family: 'Open Sans';
}
body {
  margin: 0;
}
</style>



