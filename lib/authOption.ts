import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_API_URL
    : process.env.LOCAL_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      authorize: async (credentials, req) => {
        const response = await axios<{
          token: string;
        }>({
          method: "post",
          url: `${API_URL}/auth/login`,
          data: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        if (response.data.token) {
          try {
            const decoded = jwt.verify(
              response.data.token,
              process.env.SECRET_KEY!
            );

            const userId = decoded.sub;

            return {
              id: userId,
              bearerToken: response.data.token,
            } as { id: string; bearerToken: string };
          } catch (error) {
            console.error("Token verification failed:", error);

            return null;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async (props) => {
      const { token, user } = props;

      return token;
    },

    session: async (props) => {
      const { session, token } = props;

      if (session?.user) {
        session.user.token = token;
      }

      return session;
    },
  },
  session: {
    maxAge: 14 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
