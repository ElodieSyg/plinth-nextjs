import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoClient from '../../../lib/mongoDb';
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "johndoe@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("inside authorize");
                try {
                    dbConnect();
                    console.log("connexion to database")

                    const user = await User.findOne({ email: credentials.email });
                    console.log("user in authorize", user);


                    if (!user) {
                        throw new Error("No user found with this email");
                    };

                    const checkPassword = await bcrypt.compare(credentials.password, user.password);
                    console.log("check if password is valid", checkPassword);

                    if (!checkPassword) {
                        throw new Error("Incorrect Credentials");
                    };

                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h"},
                    );
                    console.log("token", token)

                    const newSession = await Session.create({
                        email: credentials.email,
                        token,
                        userId: user._id,
                    });
                    console.log("session in authorize", newSession);

                    return user
                }
                catch (error) {
                    console.log(error);
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("inside jwt callback");
            if (user) {
                token.id = user.id;
            };
            return token;
        },
        async session({ session, user }) {
            console.log("inside session callback");
            if (token) {
                session.id = token.id;
            };

            return session
        },
        async signIn({ user }) {
            console.log("inside signIn callback");
            console.log("user in signIn callback", user)
            try {
                await dbConnect();
                return true;
            } catch (error) {
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
        signIn: "/dashboard",
        // signOut: "/auth/logout",
        // error: "/auth/error",
        // newUser: "/auth/new-user",
    },
});