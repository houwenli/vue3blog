import service from './index'

interface loginApiData {
    username: string,
    password: string
}

// 登陆接口
const login = (data: loginApiData) => {
    return service.post('/user/login', {
        ...data,
        _t: Date.now()
    })
}

interface ListApiData {
    author: string,
    keyword: string,
    page: number,
    pagesize: number
}
// 博客列表接口
const getBlogList = (data?: ListApiData) => {
    const serchData = data || {}
    
    return service.get('/blog/list', {
        params: {
            ...serchData,
            _t: Date.now()
        }
    })
}

interface AddBlogApiData {
    title: string,
    content: string,
}
// 新增博客接口
const addBlog = (data?: AddBlogApiData) => {
    
    return service.post('/blog/new', {
        ...data,
        _t: Date.now()
    })
}

interface BlogDetailApiData {
    id: string
}
// 博客详情接口
const blogDetail = (data: BlogDetailApiData) => {
    return service.get('/blog/detail', {
        params: {
            ...data,
            _t: Date.now()
        }
    })
}

export {
    loginApiData,
    login,
    ListApiData,
    getBlogList,
    AddBlogApiData,
    addBlog,
    BlogDetailApiData,
    blogDetail
}