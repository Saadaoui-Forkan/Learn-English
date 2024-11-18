import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Toolbar from "@/components/ToolBar";
import TextComposer from "@/components/TextComposer";
import SideBar from "@/components/SideBar";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
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
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${tajawal.className}`}>
        <AppProvider>
          <Toolbar />
          <div className="md:flex h-screen">
            <div className="w-52">
              <SideBar />
            </div>
            <div className="flex flex-col w-full h-full md:ml-48 mt-12">
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
              <div className="mt-auto">
                <TextComposer />
              </div>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}