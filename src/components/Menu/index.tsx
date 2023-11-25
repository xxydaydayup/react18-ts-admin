import React, { useState } from 'react'
import { Menu } from 'antd'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined
} from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store.zustand'

const SiderMenu = () => {
    const navigate = useNavigate()
    const collapsed = useStore(state => state.collapsed)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const menuList = [
        {
            label: '工作台',
            key: '/dashboard',
            icon: <AppstoreOutlined />
        },
        {
            label: 'motion动画',
            key: '/motion',
            icon: <MailOutlined />
        },
        {
            label: '系统管理',
            key: '/',
            icon: <MenuUnfoldOutlined />,
            children: [
                {
                    label: '用户管理',
                    key: '/userList',
                    icon: <PieChartOutlined />
                },
                {
                    label: '菜单管理',
                    key: '/welcome',
                    icon: <MailOutlined />
                },
                {
                    label: '部门管理',
                    key: '/dept',
                    icon: <MailOutlined />
                }
            ]
        }
    ]

    const changeMenu = ({ key }: { key: string }) => {
        // console.log(value)
        setSelectedKeys([key])
        navigate(key)
    }

    const handleClickLogo = () => {
        navigate('/layout')
    }
    return (
        <div className={styles.navSide}>
            <div className={styles.logo} onClick={handleClickLogo}>
                <img src='/logo.png' alt='logo' className={styles.img} />
                {collapsed ? '' : <span>Portal</span>}
            </div>
            <Menu
                mode='inline'
                theme='dark'
                onClick={changeMenu}
                style={{
                    width: collapsed ? '80' : '200'
                    // height: 'calc(100vh - 50px)'
                }}
                defaultSelectedKeys={['1']}
                selectedKeys={selectedKeys}
                // onClick={handleClickMenu}
                inlineCollapsed={collapsed}
                items={menuList}
            />
        </div>
    )
}

export default SiderMenu
