'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'student-project-hero');

  return (
    <section className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12 md:mb-16 bg-card shadow-lg">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
        <h2 className="text-4xl md:text-5xl font-bold font-headline drop-shadow-lg">Year Ten Students' Project </h2>
        <p className="mt-4 max-w-2xl text-lg drop-shadow">This NutriGuide AI app was built by talented students.</p>
        <Button variant="secondary" className="mt-6" onClick={() => document.getElementById('ai-coach')?.scrollIntoView({ behavior: 'smooth' })}>
          Get Started
        </Button>
      </div>
    </section>
  );
}