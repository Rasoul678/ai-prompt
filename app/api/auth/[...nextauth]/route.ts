import { UserType } from "@types";
import {
  addDocument,
  getDocument,
  getDocumentBy,
} from "@utils/firebase/firestore";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const querySnapshot = await getDocumentBy({
        collection: "users",
        where: "email",
        needle: session.user.email,
      });

      const userIds: string[] = [];

      querySnapshot.result?.forEach((doc) => {
        userIds.push(doc.id);
      });

      session.user.id = userIds[0];
      return session;
    },
    signIn: async ({ user }) => {
      let isAllowedToSignIn = true;

      try {
        // //! Check if a user already exists
        const { error: errInGet, exists } = await getDocument<UserType>({
          collection: "users",
          id: user.id,
        });

        if (errInGet) {
          isAllowedToSignIn = false;
        }

        // //! If not, create a new user
        if (!exists) {
          const newUser = {
            email: user!.email,
            username: user!.name?.replace(" ", "").toLowerCase(),
            image: user!.image,
          };

          const { error: errInAdd } = await addDocument<UserType>({
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
