import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic';
interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | ignews</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time> {post.updatedAt}</time>
                    {/* cuidado com isso */}
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params,
}) => {
    const session = await getSession({ req });
    const { slug } = params;

    if (!session.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};
