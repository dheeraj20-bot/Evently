import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons:{
    icon:'/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col" >
        <Header/>
        <main className="flex-1" >{children}</main>
        <Footer/>
    </div>
  );
}
