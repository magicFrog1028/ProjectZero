function res(code, data, msg, reply) {
  reply.code(code).send({ data:data, msg:msg });
}

module.exports = { res };
