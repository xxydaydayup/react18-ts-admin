import React from 'react'
import { motion } from 'framer-motion'
import MyAnimatedComponent from './motion1'
import MorphingPath from './motion2'
import CascaderDemo from './cascader'
import style from './index.module.less'
import StepsComponent from '@/components/Steps/steps'
import BeginStepComponent from '@/components/Steps/__begin'

const MyAnimatedCircle = () => {
    return (
        <svg width='200' height='200'>
            <motion.circle
                cx='50'
                cy='50'
                r='40'
                fill='blue'
                animate={{
                    x: [0, 100, 0], // X-axis movement
                    scale: [1, 1.5, 1], // Scaling
                    rotate: [0, 270, 0] // Rotation
                }}
                // transition={{
                //     duration: 2,
                //     ease: 'easeInOut',
                //     loop: Infinity
                // }}
            />
        </svg>
    )
}

const MyAnimatedRectangle = () => {
    return (
        <svg width='200' height='200'>
            <motion.rect
                x='50'
                y='50'
                width='100'
                height='50'
                fill='red'
                animate={{
                    scaleX: [1, 0.5, 1], // Horizontal scaling
                    rotate: [0, 180, 0], // Rotation
                    translateX: [0, 50, 0] // Horizontal movement
                }}
                transition={{
                    duration: 2.5,
                    ease: 'easeInOut'
                }}
            />
        </svg>
    )
}

function index() {
    return (
        <div className={style.commonSty}>
            <div className=' flex flex-col items-center justify-center' style={{ border: '1px solid red' }}>
                {/* <StepsComponent /> */}
                <BeginStepComponent />
            </div>

            <MyAnimatedRectangle />
            <CascaderDemo />
            <MyAnimatedCircle />
            <MorphingPath />
            <MyAnimatedComponent />
        </div>
    )
}

export default index
