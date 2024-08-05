import { Container } from "@/components/bootstrap";
import "@/styles/globals.scss";
import "@/styles/utils.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


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
        <main>
          <Container className='py-4'>
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}
