interface Window {
    BMapGL: {
        [propName: string]: any
    }
    BMapGLLib: any
    BMapLib: any
    // 给window对象扩展字段，这样window.xuxy不会报错
    xuxy: any
}
