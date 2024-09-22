import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Heading from "../../components/Heading";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App", //TODO
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px", // Align to the left instead of right
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between", // Space between items
            alignItems: "center",
            width: "100%", // Take full width to separate left and right elements
            paddingRight: "20px", // Add padding to the right to avoid overflow
          }}
        >
          <div className="mr-1">
            <Heading />
          </div>
        </div>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
