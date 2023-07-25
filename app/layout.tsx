import Nav from "./components/Nav";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Roboto, Lobster_Two } from "next/font/google";

//Define main font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "next ecommers",
  description: "developedbyed",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Fetch the user
  const session = await getServerSession(authOptions);
  return (
    <html className={`${roboto.variable} ${lobster.variable}`} lang="en">
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
