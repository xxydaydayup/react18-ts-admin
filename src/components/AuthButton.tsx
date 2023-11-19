import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'
import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router-dom'

export default function AuthButton(props: any) {
    const data = useRouteLoaderData('layout') as IAuthLoader
    const role = useStore(state => state.userInfo.role)
    // const role = 1
    if (!props.auth) return <Button {...props}>{props.children}</Button>
    if (data.buttonList.includes(props.auth) || role == 1) {
        return <Button {...props}>{props.children}</Button>
    }
    return <></>
}
