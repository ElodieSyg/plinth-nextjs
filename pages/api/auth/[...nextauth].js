import mongoClient from '../../../lib/mongoDb';
import dbConnect from "../../../lib/dbConnect";
// DEPENDENCIES IMPORTATIONS
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// PROVIDERS
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// MODELS IMPORTATIONS
import User from "../../../model/User";
import Session from "../../../model/Session";

export default NextAuth({
    // Next V4 adapter required !!! 
    adapter: MongoDBAdapter(mongoClient),
    // For persisted data, set strategy connection in db (adapter required).
    session: {
        strategy: "database",
        maxAge: 15 * 24 * 60 * 60,
        updateAge: 12 * 60 * 60,
    },
    secret: process.env.SECRET,
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "johndoe@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    dbConnect();

                    const user = await User.findOne({ email: credentials.email });


                    if (!user) {
                        throw new Error("No user found with this email");
                    };

                    const checkPassword = await bcrypt.compare(credentials.password, user.password);

                    if (!checkPassword) {
                        throw new Error("Incorrect Credentials");
                    };

                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" },
                    );

                    const newSession = await Session.create({
                        email: credentials.email,
                        token,
                        userId: user._id,
                    });

                    return user
                }
                catch (error) {
                    console.log(error);
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            };
            return token;
        },
        async session({ session, user }) {
            if (token) {
                session.id = token.id;
                session.accessToken = token.accessToken;
            };
            return session
        },
        async signIn(user, account, profile) {
            if (user && user.isActive === "1") {
                return user;
            } else {
                return false;
            };
        },
    },
    secret: process.env.SECRET_AUTH,
    jwt: {
        secret: process.env.SECRET_AUTH,
        encryption: true,
    },
    pages: {
        signIn: "/auth/signin",
        // signOut: "/auth/logout",
        // error: "/auth/error",
        // newUser: "/auth/new-user",
    },
});