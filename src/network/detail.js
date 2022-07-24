import { request } from "./request";

// 导出详情页 iid
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 商品推荐数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 整合 商品数据  多个数据封装到一个类 
export class Goods {
  constructor(itemInfo, columns, services) {
    console.log(itemInfo);
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    // this.newPrice = itemInfo.price
    this.newPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 商家数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 评论数据
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}