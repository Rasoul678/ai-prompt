import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Session } from "next-auth";

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
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
