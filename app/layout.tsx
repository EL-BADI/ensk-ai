import { auth } from "@/auth";
import TopNav from "@/components/Navigation/TopNav";
import AuthProvider from "@/components/providers/AuthProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ai Ens Kouba",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AuthProvider session={session as Session}>
          <ReactQueryProvider>
            <main className="text-textPrimary">
              <TopNav />
              {children}
            </main>
            <Toaster />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
