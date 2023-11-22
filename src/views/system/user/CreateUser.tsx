import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Form, Input, Modal, Select, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import storage from '@/utils/storage'
import api from '@/api'
import { User } from '@/types/api'
import { IModalProp, IAction } from '@/types/modal'

const beforeUpload = (file: RcFile) => {
    //设置文件类型jpg png
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
        return false
    }

    // 控制上传图片大小
    const isLt2M = file.size / 1024 / 1024 < 0.5
    if (!isLt2M) {
        message.error('Image must smaller than 500k!')
        return false
    }
    return isJpgOrPng && isLt2M
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const CreateUser = (props: IModalProp) => {
    const [form] = Form.useForm()

    const [img, setImg] = useState('')
    const [visible, setVisbile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState<IAction>('create')
    // const

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setLoading(false)
            const { code, data, msg } = info.file.response
            if (code === 0) {
                setImg(data.file)
            } else {
                message.error(msg)
            }
            // Get this url from response in real world.
            // getBase64(info.file.originFileObj as RcFile, url => {
            //     setLoading(false)
            //     setImg(url)
            // })
        } else if (info.file.status === 'error') {
            setLoading(false)
            message.error('服务器异常，请稍后重试')
        }
    }

    const handleSumbit = async () => {
        console.log('提交')

        form.validateFields().then(async val => {
            if (val) {
                console.log(val)
                const params = {
                    ...form.getFieldsValue(),
                    userImg: img
                }
                if (action === 'create') {
                    await api.createUser(params)
                    message.success('创建成功')
                } else {
                    await api.editUser(params)
                    message.success('修改成功')
                }
                handleCancel()
                props.update()
            }
        })
    }
    const handleCancel = () => {
        setVisbile(false)
        setImg('')
        form.resetFields()
    }

    // 暴露子组件open方法  第一个参数：ref变量  第二个参数: 挂到变量上的对象
    useImperativeHandle(props.mRef, () => {
        return {
            open
        }
    })

    // 调用弹框显示方法
    const open = (type: IAction, data?: User.UserItem) => {
        setAction(type)
        setVisbile(true)
        if (type === 'edit' && data) {
            form.setFieldsValue(data)
            setImg(data.userImg)
        }
    }

    return (
        <Modal
            width={800}
            title={action === 'create' ? '创建用户' : '修改用户'}
            open={visible}
            onOk={handleSumbit}
            onCancel={handleCancel}
        >
            <Form form={form} labelCol={{ span: 4 }}>
                {/* 修改的时候拿到userId, */}
                <Form.Item name='userId' hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='用户名称'
                    name='userName'
                    rules={[
                        { required: true, message: '请输入用户名称' },
                        { min: 5, max: 12, message: '用户名称最小5个字符,最大12个字符' }
                    ]}
                >
                    <Input placeholder='请输入用户名称'></Input>
                </Form.Item>
                <Form.Item label='用户邮箱'>
                    <Input type='email' />
                </Form.Item>
                <Form.Item
                    label='用户邮箱'
                    name='userEmail'
                    rules={[
                        { required: true, message: '请输入用户邮箱' },
                        { type: 'email', message: '请输入正确的邮箱' },
                        {
                            pattern: /^\w+@mars.com$/,
                            message: '邮箱必须以@mars.com结尾'
                        }
                    ]}
                >
                    <Input placeholder='请输入用户邮箱'></Input>
                </Form.Item>
                <Form.Item
                    label='手机号'
                    name='mobile'
                    rules={[
                        { len: 11, message: '请输入11位手机号' },
                        { pattern: /1[1-9]\d{9}/, message: '请输入1开头的11位手机号' }
                    ]}
                >
                    <Input type='number' placeholder='请输入手机号'></Input>
                </Form.Item>
                <Form.Item
                    label='部门'
                    name='deptId'
                    rules={[
                        {
                            required: true,
                            message: '请选择部门'
                        }
                    ]}
                >
                    <Input type='text' placeholder='请输入部门'></Input>
                </Form.Item>
                <Form.Item label='岗位' name='job'>
                    <Input placeholder='请输入岗位'></Input>
                </Form.Item>
                <Form.Item label='状态' name='state'>
                    <Select>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='系统角色' name='roleList'>
                    <Input placeholder='请输入角色'></Input>
                    {/* <Select placeholder='请选择角色'>
                    </Select> */}
                </Form.Item>
                <Form.Item label='用户图片' name=''>
                    <Upload
                        name='avatar'
                        listType='picture-circle'
                        showUploadList={false}
                        headers={{
                            Authorization: 'Bearer ' + storage.get('token'),
                            icode: 'B815F86524423DB0'
                        }}
                        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {img ? (
                            <img src={img} style={{ width: '100%', borderRadius: '100%' }} />
                        ) : (
                            <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 5 }}>上传头像</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateUser
