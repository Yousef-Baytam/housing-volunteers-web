import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/screenElements/Navbar";
import Footer from "@/components/screenElements/Footer";

export const metadata: Metadata = {
  title: "Iwaa.team",
  // Add a description for Iwaa whcih is a website made to help displaced people find shelter in the lebanese crisis
  description:
    "Iwaa.team is a website made to help displaced people find shelter in the lebanese crisis",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col items-center gap-4">
        <Navbar />
        <main className="flex w-full max-w-container grow flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
