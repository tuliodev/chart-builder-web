import { ReactNode } from "react";
import { Inter } from "next/font/google";

const roboto = Inter({
  weight: "600",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={`h-screen w-screen ${roboto.className}`}>{children}</main>
  );
}
