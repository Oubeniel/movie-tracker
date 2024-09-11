import { Container } from "@/components/bootstrap";
import NavigationBar from "@/components/NavigationBar";
import "@/styles/globals.scss";
import "@/styles/utils.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux"
import { store } from "@/store/configStore";
import ClientProvider from "@/components/ClientProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course app NEW",
  description: "Course setup and learning thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
        <NavigationBar />
        <main>
          <Container className='py-4'>
            {children}
          </Container>
        </main>
        </ClientProvider>
      </body>
    </html>
  );
}
