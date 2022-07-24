<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: ￥{{ totalPrice }}
    </div>

    <div class="calculate" @click="calcClick">
      去计算: ({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price.slice(0) * item.count
      }, 0).toFixed(2) // 保留两位小数
    },

    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 判断购物车为空
      if (this.cartList.length === 0) return false

      // 1, 数组高级函数
      // return !this.cartList.find(item => !item.checked)  
      // 2, 普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }

      //在遍历过程中 isSelectAll 会发生变化 影响 computed 的isSelectAll属性 不能简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品', 2000)
        }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: azure;
  display: flex;
  position: relative;
  bottom: 86px;
  line-height: 40px;
  font-size: 15px;
}

.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  /* flex: 1; */
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 8 0px;
  flex: 0.4;
  background-color: aqua;
  text-align: center;
}
</style>