import React from "react";
import Navbar from "../components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <div className="m-5 p-6">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
