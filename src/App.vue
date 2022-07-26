<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer>我写成= -->
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //通知Vuex发请求，获取数据存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
