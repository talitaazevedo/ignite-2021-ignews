import Head from 'next/head';
import Image from 'next/image';
import styles from './home.module.scss';
import avatarSVG from '../../public/images/avatar.svg';

export default function Home() {
    return (
        <>
            <Head>
                <title> Home | ig.news</title>
            </Head>
            <main className={styles.contentContainer}>
                {' '}
                <section className={styles.hero}>
                    <span> 👏 Hey, welcome</span>
                    <h1>
                        News aboute the <span>React</span> world
                    </h1>
                    <p>
                        Get access to all the articles on <br />
                        <span>$ 9 month</span>
                    </p>
                </section>
                <Image src={avatarSVG} alt="Girl coding" />
            </main>
        </>
    );
}
