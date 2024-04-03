import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";

export default function Home() {
  return (
    <main className="flex flex-col bg-slate-900 min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </main>
  );
}
