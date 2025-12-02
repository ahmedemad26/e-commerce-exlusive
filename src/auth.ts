import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { name: "email", type: "email", required: true },
        password: { name: "password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        console.log(credentials);

        try {
          const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Something Went Wrong");
          }

          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded.id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token = { ...user }
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
