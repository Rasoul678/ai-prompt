import { UserType } from "@types";
import {
  getDocumentBy,
  getDocument,
  addDocument,
} from "@utils/firebase/firestore";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const { result: users } = await getDocumentBy<UserType[]>({
        collection: "users",
        where: "email",
        needle: session.user.email,
      });

      session.user.id = users?.[0]._id || "";
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
};
