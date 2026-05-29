import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Portal MMORPG",
  description: "Portal da comunidade do servidor RPG II",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
