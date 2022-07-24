<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{kkk}}）</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!--底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // mapGetters 辅助函数 将store中的getter 映射到 局部计算属性
    //  ...mapGetters(['cartLength'])
      // 默认使用数组, 如果要更改 getter的 属性名字 则可以使用 对象
    ...mapGetters({
      kkk: 'cartLength'
    })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
