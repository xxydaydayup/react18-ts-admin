import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './index.less'

export default function Page() {
    const [step, setStep] = useState(1)

    const [open, setOpen] = useState(false)
    const changeOpen = () => {
        setOpen(!open)
    }

    const flagVariants = {
        active: {
            opacity: 1,
            color: '#fff',
            backgroundColor: '#2ecc71'
        },
        unactive: {
            opacity: 1,
            backgroundColor: '#3498db',
            color: '#fff'
        }
    }
    // let flag = 'active'
    // useEffect(() => {
    //     flag = open === true ? 'active' : 'unactive'
    //     console.log(flag, open)
    // }, [open])

    return (
        <div className='flex min-h-screen min-w-full items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40'>
            <div className='mx-auto w-full max-w-md rounded-2xl bg-white'>
                <div className='flex justify-between rounded p-8'>
                    <Step step={1} currentStep={step} />
                    <Step step={2} currentStep={step} />
                    <Step step={3} currentStep={step} />
                    <Step step={4} currentStep={step} />
                </div>
                <motion.div className='flex items-center justify-center'>
                    <motion.div
                        className='iconCon'
                        initial={{
                            opacity: 0
                        }}
                        animate={open ? 'active' : 'unactive'}
                        variants={flagVariants}
                        transition={{
                            delay: 0.3,
                            type: 'tween',
                            ease: 'easeOut'
                            // duration: 0.5,
                        }}
                    >
                        {open ? (
                            <motion.div className='UpIcon' onClick={changeOpen}>
                                <UpIcon />
                            </motion.div>
                        ) : (
                            <motion.div className='downIcon' onClick={changeOpen}>
                                <DownIcon />
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                <div className='px-8 pb-8'>
                    <div>
                        <div className='mt-2 h-6 w-40 rounded bg-slate-100' />
                        <div className='mt-4 space-y-2'>
                            <div className='h-4 w-5/6 rounded bg-slate-100' />
                            <div className='h-4 rounded bg-slate-100' />
                            <div className='h-4 w-4/6 rounded bg-slate-100' />
                        </div>
                    </div>

                    <div className='mt-10 flex justify-between'>
                        <button
                            onClick={() => setStep(step < 2 ? step : step - 1)}
                            className={`${
                                step < 2 ? `pointer-events-none opacity-50` : ``
                            } flex items-center justify-center border bg-gray-500  rounded px-3.5 py-1 text-white  hover:bg-gray-600`}
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setStep(step > 4 ? step : step + 1)}
                            className={`${
                                step > 4 ? 'pointer-events-none opacity-50' : ''
                            } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step({ step, currentStep }) {
    const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

    return (
        <motion.div
            animate={status}
            variants={backgroundVariants}
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
        >
            <motion.div className='flex items-center justify-center'>
                {status === 'complete' ? <CheckIcon className='h-6 w-6 text-white' /> : <span>{step}</span>}
            </motion.div>
        </motion.div>
    )
}

function CheckIcon(props) {
    return (
        <svg {...props} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    delay: 0.2,
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.3
                }}
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
            />
        </svg>
    )
}

// Framer Motion无法在CSS类之间制作动画，但它可以在CSS变量之间制作动画
const backgroundVariants = {
    inactive: {
        background: 'var(--white)',
        borderColor: 'var(--slate-200)',
        color: 'var(--slate-400)'
    },
    active: {
        background: 'var(--white)',
        borderColor: 'var(--blue-500)',
        color: 'var(--blue-500)'
    },
    complete: {
        background: 'var(--blue-500)',
        borderColor: 'var(--blue-500)'
    }
}

function DownIcon(props) {
    return (
        <svg {...props} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    delay: 0.1,
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.3
                }}
                d='M12 16l-6-6 1.41-1.41L12 13.17l4.59-4.58L18 10z'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}
function UpIcon(props) {
    return (
        <svg {...props} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    delay: 0.1,
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.3
                }}
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'
            />
        </svg>
    )
}
