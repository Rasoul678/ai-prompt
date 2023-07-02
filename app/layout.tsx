import { Session } from "next-auth";
import NextTopLoader from "nextjs-toploader";
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
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
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
