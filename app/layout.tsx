import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookie",
  description: "Generated by Bookie",
};
import { Poppins } from "next/font/google";
import { auth } from "@/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={poppins.variable}>
      <body >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
      <Toaster />
    </html>
  );
}
