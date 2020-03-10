const bcrypt = require(`bcrypt`)
const salt = 10

const hashing = (password) => {
    return bcrypt.hash(password, salt)
}

const deHash = (password, hash) => {
    return bcrypt.compare(password,hash)
}


module.exports = {
    hashing,
    deHash
}