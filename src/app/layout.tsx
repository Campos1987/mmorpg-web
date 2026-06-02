import type { Metadata } from "next";
import { SERVER_INFO } from "@/config/server-info";

import "./globals.css";

export const metadata: Metadata = {
  title: SERVER_INFO.serverName,
  description: `Comunidade do servidor ${SERVER_INFO.serverName}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
