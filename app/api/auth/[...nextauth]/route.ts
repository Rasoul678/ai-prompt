import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      return session;
    },
    signIn: async ({ profile }) => {
      try {
        await connectToDB();

        //! Check if a user already exists
        const userExists = await User.findOne({ email: profile!.email });

        //! If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile!.email,
            username: profile!.name?.replace(" ", "").toLowerCase(),
            image: profile!.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
