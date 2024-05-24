import "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface User {
    bearerToken?: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface Session {
    bearerToken?: string;
  }
}

declare module "next-auth/adapters" {
  // eslint-disable-next-line no-unused-vars
  interface AdapterUser {
    bearerToken?: string;
  }
}
