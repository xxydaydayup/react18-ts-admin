import { createHashRouter, useParams, Navigate, Outlet, useLoaderData, redirect } from 'react-router-dom'
import Error403 from '@/views/403'
import Error404 from '@/views/404'

function Goods() {
    const params = useParams()
    return <div>Goods:{params.goodsId}</div>
}

function Goods2() {
    return (
        <div>
            goods2
            <Outlet />
        </div>
    )
}

function Order() {
    // 可以用hook拿到loder的返回数据
    const data = useLoaderData()
    console.log('Order组件 init ...', data)
    return <div>Order</div>
}

// 可以通过params拿到路由参数
function orderLoader({ params }: any) {
    console.log('orderLoader init ...', params.id)
    // 在这里可以做权限判断
    if (!sessionStorage.token) return redirect('/login')
    return {
        des: '来自orderLoader',
        token: '8888'
    }
}

const router = [
    {
        path: '/',
        element: <div>22</div>
    },
    // 路由传参
    {
        path: '/goods/:goodsId',
        element: <Goods />
    },
    // 嵌套路由
    {
        path: '/goods',
        element: <Goods2 />,
        children: [
            { path: 'list', element: <div>list1</div> },
            { path: 'cart', element: <div>cart</div> }
        ]
    },
    // loader配置项会优先执行，可在orderLoader里面
    {
        path: '/order/:id',
        element: <Order />,
        loader: orderLoader
    },
    {
        path: '/404',
        // element: <div>404</div>
        element: <Error404 />
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    },
    {
        path: '/403',
        element: <Error403 />
    }
]

export default createHashRouter(router)
