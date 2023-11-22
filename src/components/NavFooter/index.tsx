import styles from './index.module.less'
const NavFooter = () => {
    return (
        <div className={styles.footer}>
            <div>
                <a href='https://www.imooc.com/u/1343480' target='_blank' rel='noreferrer'>
                    Portal主页
                </a>
            </div>
            <div>Copyright ©2023 Potal .</div>
        </div>
    )
}

export default NavFooter
