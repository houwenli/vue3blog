import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-type': 'application/json'
    }
})


service.interceptors.request.use((config : any)=> {
    return config
})


service.interceptors.response.use((res: any) => {
    return res.data
})

export default service