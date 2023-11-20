import React from 'react'
import MyAnimatedComponent from './motion1'
import MorphingPath from './motion2'
import style from './index.module.less'

function index() {
    return (
        <div className={style.commonSty}>
            <MyAnimatedComponent />

            <MorphingPath />
        </div>
    )
}

export default index
