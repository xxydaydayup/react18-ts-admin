import React from 'react'
import type { MenuProps } from 'antd'
import { DownOutlined, SmileOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown, Space, Button } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'
import { useStore } from '@/store.zustand'
import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'

function NavHeader() {
    const navigate = useNavigate()
    const localtion = useLocation()
    const { userName, userEmail } = useStore(state => state.userInfo)
    const { collapsed, updateCollapsed } = useStore(state => ({
        collapsed: state.collapsed,
        updateCollapsed: state.updateCollapsed
    }))
    // console.log(collapsed, updateCollapsed)

    // const { userName, userEmail } = userStore.userInfo

    // 控制菜单图标关闭和展开
    const toggleCollapsed = () => {
        updateCollapsed()
    }
    const breadList = [
        {
            title: '首页'
        },
        {
            title: '工作台'
        }
    ]

    const logout = () => {
        storage.remove('token')
        storage.remove('userInfo')
        const url = '/login?callback=' + encodeURIComponent(localtion.pathname)
        navigate(url)
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span>{userEmail}</span>
        },
        {
            key: '2',
            label: <span onClick={logout}>退出</span>
        }
    ]
    // const changeUserName = () => {
    //     userStore.setUserInfo()
    // }
    return (
        <div className={styles.navHeader}>
            <div className={styles.left}>
                <Button type='primary' onClick={toggleCollapsed}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>

                <Breadcrumb items={breadList} />
            </div>
            <div className={styles.right}>
                <Switch checkedChildren='暗黑' unCheckedChildren='默认' defaultChecked />
                <Dropdown menu={{ items }} arrow>
                    <Space>{userName}</Space>
                </Dropdown>
            </div>
        </div>
    )
}

export default NavHeader

// 没有observer后，store数据改变后，页面无法监听改变，同步
// export default NavHeader
// export default observer(NavHeader)
