const mysql = require('mysql');

const { MYSQL_CONF } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect()

// 查询数据
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}