import React, { useEffect } from 'react'
import request from '@/utils/request'
import storage from '@/utils/storage'
import './index.less'
import { Button } from 'antd'

function Login() {
    useEffect(async () => {
        try {
            request.get('/user', { id: 888 })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const handleClick = () => {
        console.log(111)

        request.get('/user/login', { id: 111 })
    }

    const handleStorage = key => {
        switch (key) {
            case 1:
                storage.set('name', { name: 'xuxy' })
                break
            case 2:
                storage.get('name')
                break
            case 3:
                storage.remove('name')
                break
            case 4:
                storage.clear()
                break
            default:
                break
        }
    }
    return (
        <div>
            Login
            <p>
                <Button onClick={handleClick}> 点击事件</Button>
                <Button onClick={() => handleStorage(1)}> 存入</Button>
                <Button onClick={() => handleStorage(2)}> 取出</Button>
                <Button onClick={() => handleStorage(3)}> 移除</Button>
                <Button onClick={() => handleStorage(4)}> 清除所有</Button>
            </p>
        </div>
    )
}

export default Login
