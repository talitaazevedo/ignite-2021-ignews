import styles from './styles.module.scss';
import Image from 'next/image';
import logoSvg from '../../../public/images/logo.svg';
import React from 'react';
import { SignInButton } from '../SignInButton';
import Link from 'next/link';
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoSvg} alt=" ignews seu blog de tecnologia" />
                <nav>
                    <Link href="/">
                        <a className={styles.active}>Home</a>
                    </Link>
                    <Link href="/posts" prefetch>
                        <a className={styles.active}>Posts</a>
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
