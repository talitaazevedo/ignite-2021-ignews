import styles from './styles.module.scss';
import Image from 'next/image';
import logoSvg from '../../../public/images/logo.svg';
import React from 'react';
import { SignInButton } from '../SignInButton';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { ActiveLink } from '../ActiveLink';
export function Header() {
    const { asPath } = useRouter();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoSvg} alt=" ignews seu blog de tecnologia" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink
                        href="/posts"
                        activeClassName={styles.active}
                        prefetch
                    >
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
