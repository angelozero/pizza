import { useContext } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'
import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header() {

    const { singOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={"/dashboard"}>
                    <img src="/50-white-big-shell-logo.png" width={190} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category' legacyBehavior>
                        <a>Category</a>
                    </Link>

                    <Link href='/product' legacyBehavior>
                        <a>Product</a>
                    </Link>

                    <button onClick={singOut}>
                        <FiLogOut color='#FFF' size={25} />
                    </button>
                </nav>
            </div>
        </header>
    )
}