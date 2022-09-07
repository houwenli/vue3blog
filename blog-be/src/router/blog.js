const { SuccessModel, ErrorModel } = require('../model/resModel')

const { 
    getList, 
    getDetail, 
    newBlog,
    updatBlog,
    deleteBlog,
    getBlogsCount
} = require('../controller/blog')

// 统一的登陆验证
function loginCheck (req) {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }
}

const handleBlogRouter = (req, res) => {
    let method = req.method;
    let url = req.url;
    const path = url.split('?')[0]

    // 处理get方法
    if (method === 'GET') {
        // 处理获取博客列表
        if (path === '/api/blog/list') {
            const { author = '', keyword = '', page = 0, pagesize = 0 } = req.query
            const listRes = getList(author, keyword, page, pagesize)

            const countRes = getBlogsCount(author, keyword)

            return Promise.all([countRes, listRes]).then(([countData, listData]) => {
                const listRes = {
                    list: listData,
                    count: countData.total
                }
                return new SuccessModel(listRes, '这是获取博客列表')
            })
        }
        // 处理获取博客详情
        if (path === '/api/blog/detail') {
            const { id = '' } = req.query
            

            if (!id) {
                return Promise.resolve(new ErrorModel('缺少参数id'))
            }

            const detailRes = getDetail(id)

            return detailRes.then(detailData => {
                return new SuccessModel(detailData, '这是获取博客详情')
            })
        }
    }

    // 处理post方法
    if (method === 'POST') {
        // 新建博客
        if (path === '/api/blog/new') {

            if (loginCheck(req)) {
                return loginCheck(req)
            }

            req.body.author = req.session.username

            const newRes = newBlog(req.body)
            return newRes.then(data => {
                return new SuccessModel(data, '这是新建博客')
            })
            
        }

        // 更新博客
        if (path === '/api/blog/update') {
            if (loginCheck(req)) {
                return loginCheck(req)
            }
            const { id = '' } = req.query

            const updateRes = updatBlog(id, req.body)

            return updateRes.then(data => {
                if(data) {
                    return new SuccessModel('这是更新博客')
                } else {
                    return new ErrorModel('更新博客失败')
                }
            })
        }

        // 删除博客
        if (path === '/api/blog/delete') {

            if (loginCheck(req)) {
                return loginCheck(req)
            }
            
            const { id = '' } = req.query

            req.body.author = req.session.username;

            const deleteRes = deleteBlog(id, author)

            return deleteRes.then(data => {
                if(data) {
                    return new SuccessModel('这是删除博客')
                } else {
                    return new ErrorModel('删除博客失败')
                }
            })

            
        }
    }
}

module.exports = handleBlogRouter