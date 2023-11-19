import { useRef, useState, useTransition } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import './App.css'
import router from './router'

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token，影响范围大
                    colorPrimary: '#ed6c00',
                    borderRadius: 2

                    // 派生变量，影响范围小
                    // colorBgContainer: '#272c22'
                }
            }}
        >
            <AntdApp>
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
