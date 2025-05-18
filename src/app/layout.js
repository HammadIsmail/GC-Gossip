import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UET (FSD) Anonymous Posts",
  description: "UET(FSD) Gossips is a Anonymous Posts Platform is made to give students and faculty a safe and easy way to share their thoughts, opinions, and experiences anonymously within their university community. It helps users speak freely without revealing their identity, connect with others in their department, and stay informed about what's happening across different fields of study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
