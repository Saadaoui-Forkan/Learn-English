import type { Metadata } from "next";
import { Tajawal  } from 'next/font/google';
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const tajawal = Tajawal ({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Learn English",
  description: "Learn English By Using AI From OpenAi",
  authors: [
    {
      name: "Saadaoui Mahmoud",
    },
  ],
  icons: {
    icon: "/icon.png",
  },
};

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body className={tajawal.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
