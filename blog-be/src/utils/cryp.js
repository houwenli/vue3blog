const crypto = require('crypto')

// 密钥
const key = 'houwenli@123'

// md5加密
function md5 (content) {
    const hash = crypto.createHash('md5')

    return hash.update(content).digest('hex')
}

// 加密函数
function genPassword (password) {
    return md5(`password${password}=&key=${key}`)
}

module.exports = {
    genPassword
}