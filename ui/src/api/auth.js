import request from '@/utils/request'
const login = (data) => {
  return request.post('/login', data)
}
const register = (obj) => {
  console.log(obj)
  return request.post('/register', {
    ...obj
  })
}
const getBrands = () => {
  return request.get('/brands', {
    userId: '1'
  })
}
export { login, register, getBrands }
