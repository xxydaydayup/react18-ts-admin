import React from 'react'
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

const SiderMenu = () => {
    const navigate = useNavigate()
    const menuList = [
        {
            label: '工作台',
            key: '1',
            icon: <AppstoreOutlined />
        },
        {
            label: '系统管理',
            key: '2',
            icon: <MenuUnfoldOutlined />,
            children: [
                {
                    label: '用户管理',
                    key: '3',
                    icon: <PieChartOutlined />
                },
                {
                    label: '菜单管理',
                    key: '4',
                    icon: <MailOutlined />
                }
            ]
        }
    ]

    const handleClickLogo = () => {
        navigate('/layout')
    }
    return (
        <div className={styles.navSide}>
            <div className={styles.logo} onClick={handleClickLogo}>
                <img src='/logo.png' alt='logo' className={styles.img} />
                <span>货拉拉</span>
            </div>
            <Menu
                mode='inline'
                theme='dark'
                style={{
                    width: 200,
                    height: 'calc(100vh - 50px)'
                }}
                defaultSelectedKeys={['1']}
                // selectedKeys={selectedKeys}
                // onClick={handleClickMenu}
                items={menuList}
            />
        </div>
    )
}

export default SiderMenu
