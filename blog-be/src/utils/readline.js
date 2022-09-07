const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filename = path.resolve(__dirname, '../../logs', 'access.log')

const readStream = fs.createReadStream(filename)

// 创建readline对象
const rl = readline.createInterface({
    input: readStream,
})

let chromeNum = 0
let sum = 0
// 按行读取
rl.on('line', (input) => {
    console.log(`接收到：${input}`);
    if (!input) {
        return
    }
    sum++
    let arr = input.split('--')
    if(arr[2] && arr[2].indexOf('Chrome') > -1) {
        chromeNum++
    }
});

rl.on('close', () => {
    console.log(chromeNum, sum)
})