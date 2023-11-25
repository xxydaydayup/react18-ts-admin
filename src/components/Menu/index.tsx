import React, { useState, useEffect } from 'react'
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
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom'
import type { MenuProps, MenuTheme } from 'antd/es/menu'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'
import { useStore } from '@/store.zustand'

const SiderMenu = () => {
    const navigate = useNavigate()
    const collapsed = useStore(state => state.collapsed)

    const [menuList, setMenuList] = useState<MenuItem[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    type MenuItem = Required<MenuProps>['items'][number]
    // 生成每一个菜单项
    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            label,
            key,
            icon,
            children
        } as MenuItem
    }
    function createIcon(name?: string) {
        if (!name) return <></>
        const customerIcons: { [key: string]: any } = Icons
        const icon = customerIcons[name]
        if (!icon) return <></>
        return React.createElement(icon)
    }
    // 递归生成菜单
    const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
        menuList.forEach((item, index) => {
            if (item.menuType === 1 && item.menuState === 1) {
                if (item.buttons)
                    return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
                treeList.push(
                    getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
                )
            }
        })
        return treeList
    }

    const data: any = useRouteLoaderData('layout')
    const { pathname } = useLocation()

    const _menuList = [
        // {
        //     label: '工作台',
        //     key: '/dashboard',
        //     icon: <AppstoreOutlined />
        // },
        {
            label: 'motion动画',
            key: '/motion',
            icon: <MailOutlined />
        }
        // {
        //     label: '系统管理',
        //     key: '/',
        //     icon: <MenuUnfoldOutlined />,
        //     children: [
        //         {
        //             label: '用户管理',
        //             key: '/userList',
        //             icon: <PieChartOutlined />
        //         },
        //         {
        //             label: '菜单管理',
        //             key: '/menuList',
        //             icon: <MailOutlined />
        //         },
        //         {
        //             label: '部门管理',
        //             key: '/deptList',
        //             icon: <MailOutlined />
        //         }
        //     ]
        // }
    ]

    // 初始化，获取接口菜单列表数据
    useEffect(() => {
        const treeMenuList = getTreeMenu(data.menuList)
        console.log(data.menuList, treeMenuList)

        setMenuList([..._menuList, ...treeMenuList])
        setSelectedKeys([pathname])
    }, [])

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
