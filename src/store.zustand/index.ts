import { create } from 'zustand'
// store持久化，就是和token: storage.get('token') || '',做一样的事
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { User } from '@/types/api'
import storage from '@/utils/storage'

const mockData = {
    _id: '63bc31c8300732c27697f1fd',
    userId: 1000016,
    userName: 'Xu_xy222',
    userEmail: 'demo@mars.com',
    deptId: '63bc09fe1a00ce74eeb33311',
    state: 1,
    role: 2,
    roleList: '63bc3175300732c27697f1df',
    deptName: '大前端111',
    userImg: 'http://api-driver.marsview.cc/aa0652d013a2176bfaaaf2c00.jpeg',
    job: '前端工程师',
    mobile: '1861099666',
    createId: 1000002
}

interface Store {
    count: number
    add: any
    token: string
    collapsed: boolean
    userInfo: User.UserItem
    getUserInfo: any
    updateToken: (token: string) => void
    updateUserInfo: (userInfo: User.UserItem) => void
    updateCollapsed: () => void
    updateTheme: (isDark: boolean) => void
}

export const useStore = create<Store>()(
    devtools(
        persist(
            set => ({
                count: 0,
                collapsed: false,
                add: () => set(state => ({ count: state.count + 1 })),
                token: storage.get('token') || '',
                userInfo: {},
                updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
                getUserInfo: async () => {
                    // 调用接口获取数据
                    try {
                        // const { data } = await api.getUserInfo('/user/profile')
                        // console.log(data)
                        console.log('调接口获取userInfo')
                        storage.set('userInfo', mockData)
                        set({ userInfo: mockData })
                    } catch (error) {
                        console.log(error)
                    }
                },
                updateCollapsed: () =>
                    set(state => {
                        return {
                            collapsed: !state.collapsed
                        }
                    })
            }),
            {
                name: 'store',
                // 可是
                storage: createJSONStorage(() => sessionStorage)
                //(optional)by default,localStorage'is used
            }
        )
    )
)

// export const useStore = create<{
//     count: number
//     add: any
//     token: string
//     userInfo: User.UserItem
//     getUserInfo: any
// }>(set => ({
//     count: 0,
//     add: () => set(state => ({ count: state.count + 1 })),
//     token: storage.get('token') || '',
//     userInfo: storage.get('userInfo') || {},
//     updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
//     getUserInfo: async () => {
//         // 调用接口获取数据
//         try {
//             // const { data } = await api.getUserInfo('/user/profile')
//             // console.log(data)
//             console.log('调接口获取userInfo')
//             storage.set('userInfo', mockData)
//             set({ userInfo: mockData })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }))
