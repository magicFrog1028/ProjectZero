import request from '@/utils/request'
// export default class loginService {
//   constructor() {}

//   async authenticate(username, password) {
//     let result = await request({
//       method: 'post',
//       url: 'http://localhost:5000/user/authenticate',
//       data: {
//         username: username,
//         password: password
//       },
//       headers: {
//         // remove headers
//       }
//     })
//     return result.data
//   }
// }
const authenticate = (username, password) => {
  return request.post('/user/authenticate', {
    username,
    password
  })
}
export { authenticate }
