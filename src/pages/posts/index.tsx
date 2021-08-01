import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title> Posts | ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>31 de julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>
                            conteudo do post conteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do post
                        </p>
                    </a>
                    <a href="#">
                        <time>31 de julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>
                            conteudo do post conteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do post
                        </p>
                    </a>
                    <a href="#">
                        <time>31 de julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>
                            conteudo do post conteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do post
                        </p>
                    </a>
                    <a href="#">
                        <time>31 de julho de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>
                            conteudo do post conteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do postconteudo do postconteudo do
                            postconteudo do post
                        </p>
                    </a>
                </div>
            </main>
        </>
    );
}
