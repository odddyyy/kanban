const jwt = require(`jsonwebtoken`)

const createToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

module.exports = {
    createToken,
    verifyToken
}