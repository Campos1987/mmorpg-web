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
        <div className="w-full max-w-7xl mx-auto px-4 relative">
          <div className="container-content py-8 md:py-12 md:my-[50px] rounded-xl">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
