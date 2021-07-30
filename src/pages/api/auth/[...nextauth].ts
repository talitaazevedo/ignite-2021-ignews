import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { fauna } from '../../../services/fauna';
export default NextAuth({
    // jwt: {
    //     signingKey: process.env.JWT_NEXT_AUTH_SIGNING_KEY,
    // },
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user',
        }),
        // ...add more providers here
    ],

    callbacks: {
        async signIn(user, account, profile) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email),
                                ),
                            ),
                        ),
                        q.Create(q.Collection('users'), { data: { email } }),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email),
                            ),
                        ), //final if
                    ),
                );
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
});
6;
