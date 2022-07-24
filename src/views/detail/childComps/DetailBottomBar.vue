<template>
  <div class="bottom-bar">
    <!-- 左边 -->
    <div class="bar-item bar-left">
      <div class="a">
        <div class="icon service"></div>
        <div class="text">客服</div>
      </div>
      <div class="a">
        <div class="icon shop"></div>
        <div class="text">店铺</div>
      </div>
      <div class="a">
        <div class="icon select"></div>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="a cart" @click="addToCart">加入购物车</div>
      <div class="a buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit("addCart");
      // 跳转到Detali主界面
    },
  },

}
</script>

<style scoped>
.bottom-bar {
  /* 固定定位 */
  height: 50px;
  position: relative;
  background-color: #f6f6f6;
  left: 0;
  right: 0;
  bottom: -572px;  
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}
.bar-item>div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 2px;
  background: url("@/assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service{
  background-position: 0 -54px;
}
.bar-left .shop{
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 50px;
}

.bar-right .cart {
  background-color: #f7da1e;
  color: #333;
}

.bar-right .buy {
  background-color: #317ffb;
}
</style>