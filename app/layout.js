import "@/styles/globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import NavBar from "@/components/NavBar/NavBar";
import { Providers } from "./providers";


export const metadata = {
  title: 'Glimpse Feed Explorer',
  description: 'Discover interesting content from our curated feed.',
  keywords: 'news, gist, gossip, updates, blog, trending',
};


export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Providers>
        <html lang="en">
          <body>
            <NavBar />
            {children}
          </body>
        </html>
      </Providers>
    </AuthProvider>
  );
}
