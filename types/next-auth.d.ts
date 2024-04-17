import "next-auth";

declare module "next-auth" {
  interface User {
    bearerToken?: string;
  }

  interface Session {
    bearerToken?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    bearerToken?: string;
  }
}
