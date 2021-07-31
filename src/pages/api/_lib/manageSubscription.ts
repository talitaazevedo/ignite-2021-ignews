import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';
export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {
    // Buscar o usuário no banco com o ID .
    // Salvar os dados da subscription do usuário no fauna db

    const userRef = await fauna.query(
        q.Select(
            'ref',
            q.Get(q.Match(q.Index('user_by_stripe_customer_id', customerId))),
        ),
    );
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log('subscription', subscription);
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    };
    //     q.Create(q.Collection('users'), { data: { email } }),

    if (createAction) {
        try {
            await fauna.query(
                q.Create(q.Collection('subscriptions'), {
                    data: subscriptionData,
                }),
            );
        } catch (err) {
            console.log(err);
        }
    } else {
        await fauna.query(
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(q.Index('subscription_by_id'), subscriptionId),
                    ),
                ),
                { data: subscriptionData },
            ),
        ); //Final Query
    }
}
