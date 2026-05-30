import { Footer } from "@/components/layout/footer";
import { TopBar } from "@/components/layout/top-bar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <main id="main-content" className="flex min-h-[calc(100vh-4rem)] flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
