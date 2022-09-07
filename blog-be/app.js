const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const {
    set,
    get
} = require('./src/db/redis')

const { access } = require('./src/utils/log')

// session数据
const SESSION_DATA = {}

// 处理postData
function getPostData (req) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['Content-type' !== 'application/json']) {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
            return
        })
    })
}

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))

    return d.toGMTString();
}

const serverHandler = (req, res) => {
    // 写入日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回值格式
    res.setHeader('Content-type', 'application/json');

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2
    cookieStr.split(';').forEach(item => {
        if (item) {
            const eveCookie = item.split('=') || []
            const key = eveCookie[0].trim();
            const val = eveCookie[1].trim();
            req.cookie[key] = val
        }
    });

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
    } 

    let url = req.url;
    const query = querystring.parse(url.split('?')[1])
    req.query = query
    
    Promise.all([get(userId), getPostData(req)]).then(([sessionData, postData]) => {
        // 把session写入redis
        req.userId = userId
        req.session = sessionData || {}

        req.body = postData

        // 处理blog路由
        const blogRes = handleBlogRouter(req, res)
        if (blogRes) {
            if (needSetCookie) {
                // 写入cookie
                res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
            }
            blogRes.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理user路由
        const userRes = handleUserRouter(req, res)
        if (userRes) {
            if (needSetCookie) {
                // 写入cookie
                res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
            }

            userRes.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write("404 Not Found\n")
        res.end()
    })
    getPostData(req).then(postData => {
        
    })
    
}

module.exports = serverHandler