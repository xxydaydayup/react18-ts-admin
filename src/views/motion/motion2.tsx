import { motion } from 'framer-motion'

const MorphingPath = () => {
    return (
        <svg width='200' height='200'>
            <motion.path
                d='M20 20 C50 20 50 150 150 150'
                fill='none'
                stroke='black'
                strokeWidth='2'
                animate={{ d: 'M20 20 C20 50 150 50 150 150' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
        </svg>
    )
}

export default MorphingPath
