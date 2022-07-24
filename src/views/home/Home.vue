<template>
  <div id="home">
    <!-- 导入导航模块 -->
    <nav-bar class="home-nav">
      <!-- 使用中间插槽 -->
      <div slot="center">购物节</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                  @tabClick="tabClick" ref="tabControl1" 
                  class="tab-control" v-show="isTabFixed"></tab-control>
    <Scroll class="content" ref="scroll" 
            :probe-type="2" 
            @scroll="contentScroll" 
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="imgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <FeatureView></FeatureView>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <!-- 要监听组件的点击 要加上原生的修饰符 -> .native : 监听根元素的原生事件(vue3已将弃用) -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script >

// 导入HomeSwiper -- 轮播图
import HomeSwiper from "./childComps/HomeSwiper";
// 导入RecommendView -- 推荐信息
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView'

// 导入NavBar -- 导航条插槽
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

// 导入home.js -- 首页网络请求封装
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from "../../components/common/utils/Utils";

export default {
  name: "Home",
  components: {
    // 注册
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    // 保存数据
    return {
      // result: null
      banners: [],
      recommends: [],

      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed : false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 查看 home 是否被销毁
  destroyed() {
    console.log('home destroyed');
  },
  // 保留home的活跃状态 -- 再次回到home时的状态
  activated() {
    // 再次刷新
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  // home 离开状态 -- 记录离开时的状态
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY);
  },

  // 创建生命周期函数 使组件 在被创建时 发送网络请求
  created() {
    // 1,请求多个数据
    this.getHomeMultidata1()
    // 2,请求商品数据
    this.getHomeGoods1('pop')
    this.getHomeGoods1('new')
    this.getHomeGoods1('sell')
  },
  mounted() {
    // 1, 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    this.$bus.$on('imgLoad', () => {
      // console.log('----');
      // this.$refs.scroll.refresh()
      refresh()
    })
    // 2, 获取tabControl 的 offsetTop
      // 所有组件都有一个属性 $el 用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  methods: {
    // 事件监听相关

    // 监听点击
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log('backClick');
      // 拿到 ref 为scroll组件的 scroll对象 并调用scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)

      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1,判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = (-position.y) > 1000

      // 2,决定tabControl 是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      console.log('上拉加载更多');
      // 加载更多当前页的商品
      this.getHomeGoods1(this.currentType)

      // 重新刷新 解决 better scroll 的计算bug
      // this.$refs.scroll.scroll.refresh()
    },
    imgLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关

    getHomeMultidata1() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 箭头函数this指向上层函数作用域 -> 生命周期函数created,而生命周期函数的this指向当前组件对象{}-> 
        // this.result = res;  //相当于把res的内存地址 赋值给 result 使其指向 data
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods1(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 再次刷新 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
 #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    /* top: 44px; */
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
