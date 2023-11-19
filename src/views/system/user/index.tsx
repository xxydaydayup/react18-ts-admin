import { PageParams, User } from '@/types/api'
import { Button, Table, Form, Input, Select, Space, Modal, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
// import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
// import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'
import axios from 'axios'
// import AuthButton from '@/components/AuthButton'
import SearchForm from '@/components/SearchForm'

const list = [
    {
        permissionList: {
            checkedKeys: [
                '6069c3f7341306f73b75fbfe',
                '60a0e80d92ea01921486ecac',
                '60a0e81c92ea01921486ecad',
                '60a0e82592ea01921486ecae',
                '60a0e83392ea01921486ecaf',
                '63ecf8e9b58729211daea634',
                '63ecfa68b58729211daea646',
                '63ecfa74b58729211daea649'
            ],
            halfCheckedKeys: [
                '6272009712eb226fad2f8e93',
                '6069bec6b306e7f18dd72efd',
                '63da0226a96e86702e4f2ca7',
                '6069beb8b306e7f18dd72efc',
                '6272005812eb226fad2f8e92'
            ]
        },
        _id: '609781c15ccd183084f8ea3e',
        updateTime: '2023-02-15T15:09:10.028Z',
        createTime: '2021-05-09T06:30:57.489Z',
        roleName: '产品经理',
        remark: '产品专用',
        createId: 1000002
    },
    {
        permissionList: {
            checkedKeys: [
                '6069c3f7341306f73b75fbfe',
                '60a0e80d92ea01921486ecac',
                '60a0e81c92ea01921486ecad',
                '60a0e82592ea01921486ecae',
                '60a0e83392ea01921486ecaf',
                '6083f63bc30e1188761493f4',
                '60a0e84c92ea01921486ecb0',
                '60a0e85392ea01921486ecb1',
                '60a0e85c92ea01921486ecb2'
            ],
            halfCheckedKeys: ['6069bec6b306e7f18dd72efd', '6083d756c30e1188761493f2', '6069beb8b306e7f18dd72efc']
        },
        _id: '63bc3175300732c27697f1df',
        roleName: '研发',
        remark: '研发专用',
        updateTime: '2023-01-09T13:45:39.872Z',
        createTime: '2023-01-09T13:45:39.872Z',
        __v: 0,
        createId: 1000002
    },
    {
        permissionList: {
            checkedKeys: [
                '60978d6a3c0c8738d016ca5f',
                '6083f63bc30e1188761493f4',
                '6069c3f7341306f73b75fbfe',
                '60979e5a3c0c8738d016ca61',
                '60a0e80d92ea01921486ecac',
                '63ecfa68b58729211daea646',
                '63fe1674db0ea5e72286c4cf',
                '63fe169adb0ea5e72286c4d5'
            ],
            halfCheckedKeys: [
                '6069bec6b306e7f18dd72efd',
                '6083d756c30e1188761493f2',
                '6083d76bc30e1188761493f3',
                '60979e4d3c0c8738d016ca60',
                '6272009712eb226fad2f8e93',
                '6069beb8b306e7f18dd72efc',
                '6272005812eb226fad2f8e92'
            ]
        },
        _id: '63bc3187300732c27697f1e6',
        roleName: '测试',
        remark: '测试',
        updateTime: '2023-01-09T13:45:39.872Z',
        createTime: '2023-01-09T13:45:39.872Z',
        __v: 0,
        createId: 1000002
    },
    {
        permissionList: {
            checkedKeys: [],
            halfCheckedKeys: []
        },
        _id: '63fe19d503b115e52a6ac6fe',
        roleName: '研发经理',
        updateTime: '2023-02-28T15:12:28.702Z',
        createTime: '2023-02-28T15:10:15.928Z',
        __v: 0,
        createId: 1000002
    },
    {
        permissionList: {
            checkedKeys: [],
            halfCheckedKeys: []
        },
        _id: '63fe19eb03b115e52a6ac707',
        roleName: '市场部',
        updateTime: '2023-02-28T15:10:15.928Z',
        createTime: '2023-02-28T15:10:15.928Z',
        __v: 0,
        createId: 1000002
    },
    {
        permissionList: {
            checkedKeys: [
                '6069c3f7341306f73b75fbfe',
                '60a0e80d92ea01921486ecac',
                '6069bec6b306e7f18dd72efd',
                '60a0e81c92ea01921486ecad',
                '60a0e82592ea01921486ecae',
                '60a0e83392ea01921486ecaf'
            ],
            halfCheckedKeys: []
        },
        _id: '63fe19f303b115e52a6ac70b',
        roleName: '运营部专用',
        updateTime: '2023-02-28T15:10:15.928Z',
        createTime: '2023-02-28T15:10:15.928Z',
        __v: 0,
        createId: 1000002
    }
]
export default function UserList() {
    const [form] = Form.useForm()
    const [userIds, setUserIds] = useState<number[]>([])
    const [params, setParams] = useState({})
    const userRef = useRef<{
        open: (type: IAction, data?: User.UserItem) => void
    }>()

    const getTable = async () => {
        const data = await axios.get('/user/list')
        // const data = await api.getUserList(params)
        console.log(data)
    }
    useEffect(() => {
        getTable()
    })

    // const getTableData = (
    //     { current, pageSize }: { current: number; pageSize: number },
    //     formData: User.SearchParams
    // ) => {
    //     return api
    //         .getUserList({
    //             ...formData,
    //             pageNum: current,
    //             pageSize: pageSize
    //         })
    //         .then(data => {
    //             return {
    //                 total: data.page.total,
    //                 list: data.list
    //             }
    //         })
    // }

    // const { tableProps, search } = useAntdTable(getTableData, {
    //     form,
    //     defaultPageSize: 10
    // })

    // 创建用户
    const handleCreate = () => {
        userRef.current?.open('create')
    }

    // 编辑用户
    const handleEdit = (record: User.UserItem) => {
        userRef.current?.open('edit', record)
    }

    // 删除用户
    const handleDel = (userId: number) => {
        Modal.confirm({
            title: '删除确认',
            content: <span>确认删除该用户吗？</span>,
            onOk: () => {
                handleUserDelSubmit([userId])
            }
        })
    }

    // 批量删除确认
    const handlePatchConfirm = () => {
        if (userIds.length === 0) {
            message.error('请选择要删除的用户')
            return
        }
        Modal.confirm({
            title: '删除确认',
            content: <span>确认删除该批用户吗？</span>,
            onOk: () => {
                handleUserDelSubmit(userIds)
            }
        })
    }

    // 公共删除用户接口
    const handleUserDelSubmit = async (ids: number[]) => {
        // try {
        //     await api.delUser({
        //         userIds: ids
        //     })
        //     message.success('删除成功')
        //     setUserIds([])
        //     // search.reset()
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const columns: ColumnsType<User.UserItem> = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '用户邮箱',
            dataIndex: 'userEmail',
            key: 'userEmail'
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户'
                }[role]
            }
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
            render(state: number) {
                return {
                    1: '在职',
                    2: '离职',
                    3: '试用期'
                }[state]
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime: string) {
                return formatDate(createTime)
            }
        },
        {
            title: '操作',
            key: 'address',
            render(record: User.UserItem) {
                return (
                    <Space>
                        <Button type='text' onClick={() => handleEdit(record)}>
                            编辑
                        </Button>
                        <Button type='text' danger onClick={() => handleDel(record.userId)}>
                            删除
                        </Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <div className='user-list'>
            <SearchForm form={form} initialValues={{ state: 1 }}>
                <Form.Item name='userId' label='用户ID'>
                    <Input placeholder='请输入用户ID' />
                </Form.Item>
                <Form.Item name='userName' label='用户名称'>
                    <Input placeholder='请输入用户名称' />
                </Form.Item>
                <Form.Item name='state' label='状态'>
                    <Select style={{ width: 120 }}>
                        <Select.Option value={0}>所有</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
            </SearchForm>
            <div className='base-table'>
                <div className='header-wrapper'>
                    <div className='title'>用户列表</div>
                    <div className='action'>
                        <Button type='primary' onClick={handleCreate}>
                            新增
                        </Button>
                        <Button type='primary' danger onClick={handlePatchConfirm}>
                            批量删除
                        </Button>
                        {/* <AuthButton auth='user@create' type='primary' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button> */}
                    </div>
                </div>
                <Table
                    bordered
                    rowKey='userId'
                    // rowSelection={{
                    //     type: 'checkbox',
                    //     selectedRowKeys: userIds,
                    //     onChange: (selectedRowKeys: React.Key[]) => {
                    //         setUserIds(selectedRowKeys as number[])
                    //     }
                    // }}
                    columns={columns}
                    dataSource={list}
                    // {...tableProps}
                />
            </div>
            {/* <CreateUser
                mRef={userRef}
                update={() => {
                    search.reset()
                }}
            /> */}
        </div>
    )
}
