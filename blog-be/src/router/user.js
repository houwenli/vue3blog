
const { SuccessModel, ErrorModel } = require('../model/resModel')

const {
    set
} = require('../db/redis')

const { 
    login
} = require('../controller/user')

const handleUserRouter = (req, res) => {
    let method = req.method;
    let url = req.url;
    const path = url.split('?')[0]
    
    if (method === 'POST') {
        // 处理登陆
        if (path === '/api/user/login') {
            const { username, password } = req.body

            const loginRes = login(username, password)
            return loginRes.then(ret => {

                if(ret.username) {
                    req.session.username = ret.username
                    req.session.realname = ret.realname
                    // 同步到redis
                    set(req.userId, req.session)

                    return new SuccessModel(req.session, '这是登陆接口')
                } else {
                    return new ErrorModel('登陆失败')
                }
            })
        }
    }
}

module.exports = handleUserRouter