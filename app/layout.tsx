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
        {/* Navbar included at the top */}
        <Navbar />

       
        

          {/* Main Content Area */}
          <main>{children}</main>
     
      </body>
    </html>
  );
}
