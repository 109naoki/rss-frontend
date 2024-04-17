import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          id: string;
        }>({
          method: "post",
          url: `${API_URL}/auth/login`,
          data: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        if (response.data.token) {
          console.log(response.data.token);
          return {
            id: response.data.token,
            bearerToken: response.data.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async (props) => {
      const { token, user } = props;
      if (user) {
        token.bearerToken = user.bearerToken;
      }
      return token;
    },
    session: async (props) => {
      const { session, token } = props;
      session.bearerToken = token.bearerToken as string;
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
