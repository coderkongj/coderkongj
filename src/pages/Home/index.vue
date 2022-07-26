<template>
  <div>
    <!-- 三级联动全局组件,全局组件不需要引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(item, index) in fuckFloor" :key="item.id" :floorList='item' />
    <Brand />
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav';
import ListContainer from './ListContainer/index.vue';
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from '../Brand/index.vue';
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch('floorList')
  },
  computed: {
    ...mapState({
      fuckFloor: state => state.home.floorList
    })
  }
}
</script>

<style scoped>
</style>