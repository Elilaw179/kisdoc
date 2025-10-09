import { AiCoach } from '@/components/AiCoach';
import { FoodCategories } from '@/components/FoodCategories';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Hero />
        <AiCoach />
        <FoodCategories />
      </main>
      <Footer />
    </div>
  );
}