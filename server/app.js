require("dotenv").config();
const cors = require("@fastify/cors");
const rootRouter = require("./rootRouter.js").rootRouter;
const res = require("./utils/response").res;
const server = require("fastify")({ logger: true });

const jwt = require("jsonwebtoken");
server.decorate("authorization", async (request, reply) => {
  try {
    let bearerToken = request.headers["authorization"];
    console.log("bearer token========",bearerToken);
    if (bearerToken) {
      let token = bearerToken.split(" ")[1];
      let result = await jwt.verify(token, "key", (err, data) => {
        if (err) {
          return 0;
        } else {
          console.log("======用户信息=====",data)
          return 1;
        }
      });
      if (result == 1) {
        console.log("========身份验证成功=======");
        return;
      }
      
      console.log("========身份验证失败=======");
      res(401, err, "身份验证失败", reply);
    }
    res(401, err, "身份验证失败", reply);
  } catch (err) {
    res(401, err, "身份验证失败", reply);
  }
});
server.register(rootRouter);
server.register(cors, {});

const startServer = async () => {
  //server start
  await server.listen(process.env.SERVER_HOST_PORT);
  server.log.info("Server Running On");

  /*Database code
    =================================
    =================================
    */
};

startServer();
