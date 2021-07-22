import styles from './styles.module.scss';
import Image from 'next/image';
import logoSvg from '../../../public/images/logo.svg';
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoSvg} alt=" ignews seu blog de tecnologia" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a className={styles.active}>Posts</a>
                </nav>
            </div>
        </header>
    );
}
