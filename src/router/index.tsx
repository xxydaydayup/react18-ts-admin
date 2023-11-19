import {
    createHashRouter,
    useParams,
    Navigate,
    Outlet,
    useLoaderData,
    redirect,
    createBrowserRouter
} from 'react-router-dom'
import Login from '@/views/Login/Login'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Dashboard from '@/views/Dashboard'
import Layout from '@/layout/index'
import Welcome from '@/views/welcome'
import UserList from '@/views/system/user'
// import { Layout } from 'antd'

const router = [
    {
        path: '/',
        element: <Navigate to='/welcome' />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        // path: '/layout',
        element: <Layout />,
        children: [
            {
                path: '/welcome',
                element: <Welcome />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/userList',
                element: <UserList />
            }
        ]
    },
    {
        path: '/404',
        element: <Error404 />
    },
    {
        path: '/403',
        element: <Error403 />
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    }
]

// 组件路由和api路由，两者就是加载的方式不同。推荐使用api路由，因为api路由功能更加强大
export default createBrowserRouter(router)
