import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import env from '@/config'
import storage from '@/utils/storage'
import { Result } from '@/types/api'
import { message } from 'antd'

// console.log(import.meta.env)

// 创建实例
const instance = axios.create({
    // baseURL: '/api',
    // baseURL: import.meta.env.VITE_BASE_API,
    // baseURL: env.baseApi,
    timeout: 8000,
    timeoutErrorMessage: '请求超时,请稍后再试',
    headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const token = storage.get('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        config.headers.icode = 'A7EEA094EAA44AF4'
        // 如果开启了MOCK，则将baseurl替换成
        console.log(env.mock)

        if (env.mock) {
            config.baseURL = env.mockApi
        } else {
            config.baseURL = env.baseApi
        }
        showLoading()
        // debugger
        return config
    },
    function (error) {
        // 对请求错误做些什么
        hideLoading()
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // window.xuxy
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        const data: Result = response.data
        hideLoading()
        // token失效，移除token
        if (data.code === 500001) {
            message.error(data.msg)
            localStorage.removeItem('token')
        } else if (data.code != 200) {
            message.error(data.msg)
            return Promise.reject(data)
        }
        return data
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        hideLoading()
        message.error(error)
        return Promise.reject(error)
    }
)

interface IConfig {
    showLoading?: boolean
    showError?: boolean
}

export default {
    get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
        return instance.get(url, { params, ...options })
    },
    post<T>(url: string, params: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
        return instance.post(url, params, options)
    }
}
