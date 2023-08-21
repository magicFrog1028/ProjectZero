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
const txt2Img = (args) => {
  return request.post('/graphics/generateGraphics', args)
}
export { txt2Img }
