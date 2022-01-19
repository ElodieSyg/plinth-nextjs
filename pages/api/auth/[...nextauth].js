import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    // Next V4 adapter required !!! 
    adapter: MongoDBAdapter(mongoClient),
    // For persisted data, set strategy connection in db (adapter required).
    session: {
        strategy: "database",
        maxAge: 15 * 24 * 60 * 60,
        updateAge: 12 * 60 * 60,
    },
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "johndoe@test.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: (credentials) => {
                if (credentials.username && credentials.password) {
                    return {
                        id: 2,
                        // user....
                    };
                };

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // First time JWT callback is run, user object is available.
            if (user) {
                token.id = user.id;
            };

            return token;
        },
        async session({ session, token }) {
            console.log("token", token)
            if (token) {
                session.id = token.id;
            };

            return session
        },
    },
    secret: process.env.SECRET_AUTH,
    jwt: {
        secret: process.env.SECRET_AUTH,
        encode: true,
    },
    pages: {
        signIn: "/",
    }
})