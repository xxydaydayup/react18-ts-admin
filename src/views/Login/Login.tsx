import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import request from '@/utils/request'
import storage from '@/utils/storage'
import styles from './index.module.less'
import { Login as _Login } from '@/types/api'
// import { useSearchParams } from 'react-router-dom';
import api from '@/api'
import { callbackify } from 'util'

type FieldType = {
    username?: string
    password?: string
    remember?: string
}

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: _Login.params) => {
        setLoading(true)
        try {
            const data: any = await api.login(values)
            console.log(data)
            storage.set('token', data.token)
            if (data.code === 200) {
                message.success('登陆成功')
                if (location.search) {
                    const searchParams = new URLSearchParams(location.search)
                    const callbackUrl = searchParams.get('callback') || '/welcome'
                    console.log(callbackUrl)
                    navigate(callbackUrl)
                    return
                }
                navigate('/layout')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    // useEffect(async () => {
    //     const data = request.get('/user', { id: '111' })
    //     console.log(data)
    // }, [])

    return (
        <div className={styles['login']}>
            {/* <div className='loginWrapper'> */}
            <div className={styles['loginWrapper']}>
                <Card title='系统登录' hoverable headStyle={{ textAlign: 'center' }}>
                    <Form
                        name='basic'
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item<FieldType>
                            label='Username'
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type='primary' htmlType='submit' loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login
