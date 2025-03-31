import type { Metadata } from "next";
import { Source_Sans_3  as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ORIGIN_URL } from "@/utils/helpers";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight : ["200","300","400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: "PDFreakout",
  description: "PDFreakout is a AI SAAS application that summarize the pdf documents",
  metadataBase : new URL(ORIGIN_URL),
  alternates :{
    canonical : ORIGIN_URL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={` ${fontSans.variable} font-sans antialiased`}
          >
            <div className="relative flex flex-col min-h-screen">
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </body>
        </html>
    </ClerkProvider>
    
  );
}
