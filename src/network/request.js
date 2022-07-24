import axios from 'axios'

export function request(config) {
  // return new Promise((resolve, reject) => {
  //   // 1,创建axios的实例
  //   const instance = axios.create({
  //     baseURL: 'http://123.207.32.32:8000',
  //     Timeout: 5000
  //   })

  // 1,创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66/',
      Timeout: 5000
    })
    //2, axios 拦截器
    // 2.1 请求拦截的作用 -- interceptors.request
    instance.interceptors.request.use(config => {
      // console.log(config);
      // 1, 比如config中的一些信息不符合服务器的要求

      // 2,比如每次发送网络请求时,希望在界面中显示一个请求图标(动画)

      // 3,某些网络请求(比如登录令牌(token)),必须携带一些特殊的信息

      return config
    },err => {
      console.log(err);
    })
    // 2.1响应拦截的作用 -- interceptors.response
    instance.interceptors.response.use(res => {
      // console.log(res);
      // res.data
      return res.data
    },err => {
      console.log(err);
    })    
    // 3,发送真正的网络请求
    return instance(config)
      // .then(res => {
      //   resolve(res)
      // })
      // .catch(err => {
      //   reject(err)
      // })
  
}