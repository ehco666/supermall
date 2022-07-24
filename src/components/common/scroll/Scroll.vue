<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  props: {
    // 监听默认值
    probeType: {
      type: Number,
      default: 0
    },
    // 上拉加载更多默认值
    pullUpLoad: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1,创建Bscroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      // observeImage: true,
      click: true,
      //  开启上拉加载 -- 显示实时坐标
      // pullUpLoad:true,
      // 把 props 的值赋给 这里
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2,监听滚动的位置
    // if (this.probeType === 2 || probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // console.log(this.scroll);
      // this.scroll.scrollTo(0, 0) 
    // }


    // 3, 监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        console.log('滚动到底部');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    // finishPullUp() {
    //    this.scroll.finishPullUp()
    // }
    refresh() {
      console.log('---刷新');
      this.scroll.refresh() 
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>