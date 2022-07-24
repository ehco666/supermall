<template>
 <div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item, index) in cartList" 
                    :item-info="item"
                    :key="index"></cart-list-item>
  </scroll>
 </div>
</template>

<script>
  import Scroll from '@/components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  }, 
  computed: {
  ...mapGetters(['cartList'])
 },

//  处于活跃时 调用scroll 里的 refresh 方法 进行刷新
 activated() {
  this.$refs.scroll.refresh()
 }
}
</script>

<style scoped>
  .cart-list {
    /* position: relative; */
    height: 93vh;
    overflow: hidden;
    /* background-color: aqua; */
  }
  .content  {
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>