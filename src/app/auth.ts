import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        // Hardcoded users (in production, use a database)
        const hardcodedUsers = [
          { id: "1", email: "user@example.com", password: "password123", name: "Demo User" },
          { id: "2", email: "admin@khanagro.com", password: "admin123", name: "Admin User" },
          { id: "3", email: "test@test.com", password: "test123", name: "Test User" },
        ];

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = hardcodedUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/check", // Your custom login page
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});