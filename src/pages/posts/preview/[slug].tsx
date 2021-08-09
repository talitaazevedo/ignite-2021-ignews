import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import styles from '. ./post.module.scss';
import { getPrismicClient } from '../../../services/prismic';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { Router, useRouter } from 'next/dist/client/router';
interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);
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
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <div className={styles.continueReading}>
                        Wanna Continue reading ?{' '}
                        <Link href="/">
                            <a> Subscribe Now 👈</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}
// essa função só existe quando utilizamos  slugs
export const getStaticPaths: GetStaticPaths = async () => {
    // Quais posts eu quero gerar durante a Build
    // Para Criação informar os slugs dos posts

    return {
        paths: [
            // Adicione o slug que será gerado.
            //   {params:{slug: 'server-less-application-com-node-js'}},
        ],
        fallback: 'blocking', //true, false, blocking.
        //  true =>  caso haja acesso quando ainda não foi gerado o fallback => problema  layout shift => não é muito bom para SEO
        // false => se o post não foi gerado  ainda  retorna 404 => quando carrega usa server side rendering e só mostra quando tudo estiver pronto
        //blocking =>
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;
    const prismic = getPrismicClient();
    const response = await prismic.getByUID('post', String(slug), {});
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),

        updatedAt: new Date(
            response.data.last_publication_date,
        ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    };
    return {
        props: { post },
        redirect: 60 * 30, // 30 minutes
    };
};
