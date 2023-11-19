import React, { useEffect } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, Watermark } from 'antd'
import styles from './index.module.less'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SiderMenu from '@/components/Menu'
import { useStore } from '@/store.zustand'
import { observer } from 'mobx-react-lite'
import storage from '@/utils/storage'
import api from '@/api'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const { getUserInfo } = useStore()

    useEffect(() => {
        // userStore.getUserInfo()
        getUserInfo()
    }, [])

    const {
        token: { colorBgContainer }
    } = theme.useToken()

    return (
        <Watermark content='Ant Design'>
            <Layout style={{ height: '100vh', border: '1px solid red' }}>
                <Sider collapsed={false}>
                    <SiderMenu />
                </Sider>
                <Layout>
                    <NavHeader />
                    <div className={styles.content}>
                        <div className={styles.wrapper}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                    <NavFooter />
                </Layout>
            </Layout>
        </Watermark>
    )
}

export default App
