import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query(
        [Prismic.Predicates.at('document.type', 'post')],
        {
            fetch: ['post.title', 'publication.content'],
            pageSize: 100,
        },
    );
    // console.log(response);
    // Quando houver  mais de uma identação em um objeto usar o console.log abaixo para testar
    console.log(JSON.stringify(response, null, 2));

    return {
        props: {},
    };
};
