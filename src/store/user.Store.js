import { makeAutoObservable } from 'mobx'
import storage from '@/utils/storage'
import api from '@/api'

const mockData = {
    _id: '63bc31c8300732c27697f1fd',
    userId: 1000016,
    userName: 'Xu_xy111',
    userEmail: 'demo@mars.com',
    deptId: '63bc09fe1a00ce74eeb33311',
    state: 1,
    role: 2,
    roleList: '63bc3175300732c27697f1df',
    deptName: '大前端',
    userImg: 'http://api-driver.marsview.cc/aa0652d013a2176bfaaaf2c00.jpeg',
    job: '前端工程师',
    mobile: '1861099666',
    createId: 1000002
}

class UserStore {
    userInfo = storage.get('userInfo') || {}
    constructor() {
        makeAutoObservable(this)
    }
    getUserInfo = async () => {
        // 调用接口获取数据
        // console.log('开始电工')
        try {
            // const { data } = await api.getUserInfo('/user/profile')
            // console.log(data)
            storage.set('userInfo', mockData)
            this.userInfo = mockData
        } catch (error) {
            console.log(error)
        }
    }

    setUserInfo = () => {
        console.log('改变')
        this.userInfo = { userName: 'test1', userEmail: '9827@123.com' }
    }
}

export default UserStore
