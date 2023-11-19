// 给没有类型定义的模块、变量添加类型声明，一般使用 xxx.d.ts定义文件，建议在src下面创建声明文件

import axios from 'axios' //一定要引axios，让AxiosRequestConfig在axios的基础上去继承，从而扩展AxiosRequestConfig字段。否则会覆盖axios中的AxiosRequestConfig类型名，造成request.ts中报错
declare module 'axios' {
    interface AxiosRequestConfig {
        showLoading?: boolean
        showError?: boolean
    }
}
