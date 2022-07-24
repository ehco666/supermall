<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <!-- 尺码数 v-for="(table, index) in goodsParam.sizes"
      :key="index" -->
    <table class="table-sizes">
      <tr v-for="(tr, index) in paramInfo.sizes[0]" :key="index">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <!-- 商品材质、类型 -->
    <table class="table-infos">
      <tr v-for="(item, index) in paramInfo.infos" :key="index" >
        <td class="info-key">{{ item.key }}</td>
        <td class="info-value">{{ item.value }}</td>
      </tr>
    </table>
    <div v-if="paramInfo.image.length !== 0" class="param-img">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
      paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info {
  font-size: 14px;
  margin: 5px;
  padding: 5px 10px 15px 15px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 38px;
}
.param-info table tr td {
  height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.table-sizes {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.info-key {
  width: 95px;
}
.info-value {
  color: #d85757;
}
.param-img img {
  width: 100%;
}
</style>
