import axios from 'axios'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const baseURL = 'http://127.0.0.1:5000/'
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    authorization: 'Bearer ' + userStore.token
  }
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log('error:', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data
    //如果响应返回状态不是200，则抛出一个错误的Promise
    if (response.status !== 200) {
      console.log('NOT200')
      return Promise.reject(response.message)
    }
    return res
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('错误拦截')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
