const fs = require('fs');

const path = require('path');

// 往stream写入日志
function writeStream(writeStream, log) {
    writeStream.write(log + '\n')
}

function createWriteStream(filename) {
    const filePath = path.resolve(__dirname, '../../logs', filename)
    const writeStream = fs.createWriteStream(filePath, {
        flags: 'a'
    })
    return writeStream
}

// 写入日志
function access (log) {
    const accessLogStream = createWriteStream('access.log')
    writeStream(accessLogStream, log)
}

module.exports = {
    access
}