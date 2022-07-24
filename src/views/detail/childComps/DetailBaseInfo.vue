<template>
 <div v-if="Object.keys(goods).length !== 0" class="base-info">
  <div class="info-title">{{goods.title}}</div>
  <div class="info-price">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goods.columns[0]}}</span>
    <span>{{goods.columns[1]}}</span>
    <span>{{goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
      <img :src="goods.services[index-1].icon" alt="">
      <span>{{goods.services[index-1].name}}</span>
    </span>
  </div>
 </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    padding: 0 10px;
  }
  .info-title {
    margin:15px 0;
    font-size: 16px;
    font-weight: 520;
  }
  .info-price {
    margin-bottom: 15px;
  }
  .n-price {
    font-size: 20px;
    color: #fa6779;
    font-weight: 700;
    margin-right: 10px;
  }
  .o-price {
    color: #a0a0a0;
    font-size: 15px;
    margin-right:10px;
    text-decoration: line-through;
  }
  .discount {
    color: #fff;
    background-color: #fa6779;
    font-size: 13px;
    padding: 0 5px;
    border-radius: 5px;
  }
  .info-other {
    margin-top: 10px;
    color:#a0a0a0;
    line-height: 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 15px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .info-service {
    margin-top: 10px;
    line-height: 20px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.15);
  }
  .info-service img {
    width: 12px;
  }
</style>