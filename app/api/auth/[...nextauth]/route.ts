import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { addDocument, getDocument } from "@utils/firebase/firestore";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      return session;
    },
    signIn: async ({ user }) => {
      let isAllowedToSignIn = true;

      try {
        // //! Check if a user already exists
        const { result, error: errInGet } = await getDocument({
          collection: "users",
          id: user.id,
        });

        if (errInGet) {
          isAllowedToSignIn = false;
        }

        // //! If not, create a new user
        if (!result?.exists()) {
          const newUser = {
            email: user!.email,
            username: user!.name?.replace(" ", "").toLowerCase(),
            image: user!.image,
          };

          const { error: errInAdd } = await addDocument({
            colllection: "users",
            id: user.id,
            data: newUser,
          });

          if (errInAdd) {
            isAllowedToSignIn = false;
          }
        }
      } catch (error) {
        console.log(error);
        isAllowedToSignIn = false;
      }

      return isAllowedToSignIn;
    },
  },
});

export { handler as GET, handler as POST };
