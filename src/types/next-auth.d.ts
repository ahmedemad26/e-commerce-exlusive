
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    user: {
      name: string;
      role: string;
      email: string;
    };
    token: string;
  }
  interface Session {
    user: User.user;
  }
}
