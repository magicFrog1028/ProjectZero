function extractToken(request) {
    const tokenRaw = request.headers['authorization'];
    const token = tokenRaw.split(' ')[1];
    return token
}
  
  module.exports = { extractToken };