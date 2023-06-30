import { Session } from "next-auth";
import Nav from "@components/Nav";
import SessionProvider from "@components/Provider";
import RQProvider from "@utils/react-query/provider";
import "@styles/globals.css";

interface IProps {
  session: Session | null;
  children: React.ReactNode;
}

export const metadata = {
  title: "AI Prompt",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children, session }: IProps) => {
  return (
    <html lang="en">
      <body>
        <RQProvider>
          <SessionProvider session={session}>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </SessionProvider>
        </RQProvider>
      </body>
    </html>
  );
};

export default RootLayout;
