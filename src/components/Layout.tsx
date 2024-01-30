import { ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main
      className={`h-screen w-screen ${fontSans.className} overflow-x-hidden overflow-y-auto no-scrollbar `}
    >
      {children}
    </main>
  );
}
