<template>
  <!-- 导入轮播图模块 -->
    <swiper>
      <!-- 使用轮播图片插槽 -->
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
// 导入 Swiper, SwiperItem -- 轮播图
  import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return[]
      }
    }
  },
  methods: {
    imgLoad() {
      // 判断 isLoad是否已经发出过事件
      if(!this.isLoad) {
        // console.log('imgLoad');
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
  
</style>