import Head from 'next/head';
import Image from 'next/image';
import styles from './home.module.scss';
import avatarSVG from '../../public/images/avatar.svg';
import { SubscribeButton } from '../components/SubscribeButton';
import { GetServerSideProps } from 'next';
import { stripe } from '../services/stripe';

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    };
}
export default function Home({ product }: HomeProps) {
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
                        News about the <span>React</span> world
                    </h1>
                    <p>
                        Get access to all the articles on <br />
                        <span> for {product.amount} month</span>
                    </p>
                    <SubscribeButton priceId={product.priceId} />
                </section>
                <Image src={avatarSVG} alt="Girl coding" />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const price = await stripe.prices.retrieve(
        'price_1JGrKzFZnKPPGbbtmvoAQ9cb',
        {
            expand: ['product'],
        },
    );
    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price.unit_amount / 100),
    };
    return {
        props: {
            product,
        },
    };
};
